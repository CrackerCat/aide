# 常见问题解答

## 连接超时或文件无响应

**问题描述**：使用代理的用户或位于中国大陆的用户可能会遇到连接超时错误。

**解决方案**：

1. **检查网络代理配置**：

   - 使用命令终端测试能否 `ping` 通 `openai.com`（或其他 API Base URL）。
     - 命令示例：`ping openai.com`。
     - 注意：浏览器能访问网站并不意味着命令终端也可以，可能需要单独为终端设置代理。
   - 设置环境变量 `HTTPS_PROXY`：
     - 示例：`http://127.0.0.1:7890`（若使用 `clash` 代理，默认端口为 `7890`）。
     - 对于 `clash` 用户，请确保启用了 `TUN` 功能。

2. **执行以下操作**：
   - 确认代理配置正确，如有需要可重启代理工具。
   - 尝试更换代理或检查网络连接。
   - 使用可正常访问的 API Base URL。

详细信息请参阅 [GitHub Issue #17](https://github.com/nicepkg/aide/issues/17)。

## 超出 AI 模型上下文限制

**问题描述**：AI 模型对上下文的字符数有限制，超出可能导致处理失败。

**解决方案**：

1. **部分文本处理**：

   - 多数功能允许用户选中部分文本后右键调用 AI 功能，以减少字符数。

2. **分批处理**：

   - 将文本分割成小段分别处理。

3. **切换模型**：
   - 选用支持更大上下文的 AI 模型。

## 配置了第三方 `API Base URL` 无法使用

**问题描述**：配置了第三方 [`API Base URL`](../configuration/openai-base-url.md) 后，AI 功能无法正常使用。

**解决方案**：

1. **检查 `API Base URL`**：

   - 确认配置的 `API Base URL` 是否正确。
   - 默认 `API Base URL` 为 `https://api.openai.com/v1`。
   - 尝试在 URL 中添加或去掉 `/v1`，以确保正确配置。

2. **确认 API 符合 `OpenAI` 接口规范**：

   - 询问供应商是否其 API 符合 `OpenAI` 的接口规范。

3. **检查 `API Base URL` 和 AI 模型是否支持 `function_call` 功能**：
   - 某些功能使用了 `function_call` 功能，部分第三方大语言模型可能不支持该功能。

## Command 'aide.xxxx' Not Found

**问题描述**：在使用 `Aide` 功能时，提示 `Command 'aide.xxxx' not found`。

**解决方案**：

1. **检查你的 VSCode 版本是否大于 v1.82.0**：

   - `Aide` 需要 `VSCode` 版本大于 `v1.82.0`。

2. **检查 `Aide` 是否已正确安装最新版**：

   - 打开 `VSCode` 的扩展侧边栏，搜索 `Aide`，确保已安装最新版。

3. **如果以上方法无效**：

   - 请尝试重启 `VSCode`。
   - 如果问题仍然存在，请尝试重新安装 `Aide`。
