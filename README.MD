## JavaScript is so much more than your favorite framework!

This is a repo that showcases how to use vanilla JS to build
a simple note-taking web application with features like:
- Client-side routing
- State management
- Persistent storage
- Inter-component communication
- Responsive design
- Toast notifications
- JSX syntax without React
- Chrome AI integration (Gemini Nano)

The goal is to demonstrate that you don't need a heavy framework
to build interactive web apps. Modern JavaScript and the DOM API provide all the tools you need to create rich user experiences without the overhead of a full-fledged framework.

This also serves as an educational resource for understanding how frameworks like React work under the hood by implementing similar features from scratch.

Should you not use a framework though? You probably should
because they are battle tested, have huge ecosystems, and
great developer tools. But if you want to learn more about
JavaScript, and what it can do, this is a fun way to explore that!

## Chrome AI (Gemini Nano) Setup

This app integrates with Chrome's built-in AI to help improve your notes. To enable this feature:

### Prerequisites
- **Chrome Dev or Canary** (version 138 or higher)
- Available on **Windows 10+, macOS 13+ (Ventura), Linux, or ChromeOS** (Chromebook Plus)
- **Storage**: At least 22 GB of free space
- **Hardware**:
  - GPU: More than 4 GB of VRAM, OR
  - CPU: 16+ GB RAM and 4+ CPU cores
- **Network**: Unlimited/unmetered connection for download

### Enabling Chrome AI

1. **Enable Prompt API**
   - Navigate to `chrome://flags/#prompt-api-for-gemini-nano`
   - Set it to **Enabled**
   - Relaunch Chrome

2. **Enable Optimization Guide**
   - Navigate to `chrome://flags/#optimization-guide-on-device-model`
   - Set it to **Enabled BypassPerfRequirement**
   - Relaunch Chrome

3. **Confirm AI Availability**
   - Navigate to `chrome://on-device-internals`
   - You should see the Gemini Nano model listed
   - The model will download automatically on first use (about 1.5-2 GB)
   - You can also check download status at `chrome://components` under **Optimization Guide On Device Model**

4. **Verify in Console**
   ```javascript
   await LanguageModel.availability()
   // Should return: "readily" or "downloadable"
   ```

Once enabled, you'll see an **"Improve with AI"** button (⚡ icon) in the note editor that will:
- Fix grammar mistakes
- Improve clarity and readability
- Maintain your original tone
- Keep the same general structure

### Troubleshooting
- If `availability()` returns `"unavailable"`, ensure both flags are enabled and Chrome is relaunched
- Check your system meets the hardware requirements (GPU with 4+ GB VRAM or 16+ GB RAM)
- Ensure you have at least 22 GB of free disk space
- The model downloads automatically on first API use (requires user interaction like a button click)
- Check `chrome://on-device-internals` to see if the model is downloading or ready
- The AI button only appears when the API is available - no button means AI isn't ready yet

### More Information
- [Chrome AI Prompt API Documentation](https://developer.chrome.com/docs/ai/prompt-api)
- [Built-in AI Overview](https://developer.chrome.com/docs/ai/built-in)