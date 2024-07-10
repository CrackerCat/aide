import {
  createCurrentModelRunnable,
  getCurrentSessionIdHistoriesMap
} from '@/ai/model-providers'
import { tmpFileWriter } from '@/ai/tmp-file-writer'
import { getConfigKey } from '@/config'
import { createTmpFileInfo } from '@/create-tmp-file'
import type { BaseLanguageModelInput } from '@langchain/core/language_models/base'
import type { RunnableConfig } from '@langchain/core/runnables'
import * as vscode from 'vscode'

const buildGeneratePrompt = async ({
  sourceLanguage,
  code
}: {
  sourceLanguage: string
  code: string
}): Promise<BaseLanguageModelInput> => {
  const locale = vscode.env.language
  const codeViewerHelperPrompt = await getConfigKey('codeViewerHelperPrompt')
  const prompt = codeViewerHelperPrompt
    .replace('#{sourceLanguage}', sourceLanguage)
    .replace('#{locale}', locale)
    .replace('#{content}', code)
  return prompt
}

export const cleanupCodeViewerHelperRunnables = async () => {
  const openDocumentPaths = new Set(
    vscode.workspace.textDocuments.map(doc => doc.uri.fsPath)
  )
  const sessionIdHistoriesMap = await getCurrentSessionIdHistoriesMap()

  Object.keys(sessionIdHistoriesMap).forEach(sessionId => {
    const path = sessionId.match(/^codeViewerHelper:(.*)$/)?.[1]

    if (path && !openDocumentPaths.has(path)) {
      delete sessionIdHistoriesMap[sessionId]
    }
  })
}

export const handleCodeViewerHelper = async () => {
  const {
    originalFileContent,
    originalFileLanguageId,
    tmpFileUri,
    isTmpFileHasContent
  } = await createTmpFileInfo()

  const aiRunnable = await createCurrentModelRunnable()
  const sessionId = `codeViewerHelper:${tmpFileUri.fsPath}}`
  const aiRunnableConfig: RunnableConfig = {
    configurable: {
      sessionId
    }
  }
  const sessionIdHistoriesMap = await getCurrentSessionIdHistoriesMap()
  const isSessionHistoryExists = !!sessionIdHistoriesMap[sessionId]
  const isContinue = isTmpFileHasContent && isSessionHistoryExists

  const generatePrompt = await buildGeneratePrompt({
    sourceLanguage: originalFileLanguageId,
    code: originalFileContent
  })

  await tmpFileWriter({
    languageId: originalFileLanguageId,
    buildAiStream: async () => {
      if (!isContinue) {
        // cleanup previous session
        delete sessionIdHistoriesMap[sessionId]

        const aiStream = aiRunnable.stream(
          {
            input: generatePrompt
          },
          aiRunnableConfig
        )
        return aiStream
      }

      // continue
      return aiRunnable.stream(
        {
          input: `
        continue, please do not reply with any text other than the code, and do not use markdown syntax.
        go continue.
        `
        },
        aiRunnableConfig
      )
    }
  })
}
