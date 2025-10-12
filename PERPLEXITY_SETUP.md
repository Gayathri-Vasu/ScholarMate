# Perplexity API Setup Guide

This guide will help you configure the Perplexity API for the Tamil Nadu Learning Hub chatbot.

## 🔑 Getting Your Perplexity API Key

1. **Visit Perplexity AI**: Go to [https://www.perplexity.ai/](https://www.perplexity.ai/)
2. **Sign Up/Login**: Create an account or log in to your existing account
3. **Access API**: Navigate to the API section in your dashboard
4. **Generate API Key**: Create a new API key for your project
5. **Copy the Key**: Save your API key securely

## ⚙️ Configuration

### Step 1: Update Environment Variables

Add your Perplexity API key to the `.env` file in the root directory:

```env
# Perplexity AI Configuration
VITE_PERPLEXITY_API_KEY=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
VITE_PERPLEXITY_API_URL=https://api.perplexity.ai/chat/completions
```

**Replace `your_actual_api_key_here` with your actual Perplexity API key.**

### Step 2: Restart Development Server

After updating the `.env` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## 🧪 Testing the Integration

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Open the chatbot**: Click the chat button in the bottom-right corner

3. **Test the API**: Send a message like:
   - "What courses do you have for TN State Board?"
   - "Tell me about TNPSC preparation"
   - "What programming languages are covered?"

## 🔧 Features

### ✅ What's Included

- **Direct API Integration**: Chatbot calls Perplexity API directly from frontend
- **Context-Aware**: AI knows about Tamil Nadu Learning Hub courses and structure
- **Conversation History**: Maintains context across multiple messages
- **Error Handling**: Graceful fallback when API is unavailable
- **Configuration Check**: Visual warning when API key is not configured

### 🎯 AI Capabilities

The chatbot is configured to help with:
- **Course Recommendations**: Based on student level and interests
- **Subject Guidance**: TN Board, TNPSC, Engineering, IT Placement
- **Educational Support**: Explaining concepts and providing study tips
- **Platform Navigation**: Helping users find relevant content

## 🚨 Troubleshooting

### Common Issues

1. **"API Not Configured" Warning**
   - Make sure `VITE_PERPLEXITY_API_KEY` is set in `.env`
   - Restart the development server after updating `.env`

2. **"API Key Not Valid" Error**
   - Verify your API key is correct
   - Check if your Perplexity account has API access enabled
   - Ensure you have sufficient credits/quota

3. **Network Errors**
   - Check your internet connection
   - Verify the API URL is correct
   - Check browser console for detailed error messages

4. **Rate Limiting**
   - Perplexity API has rate limits
   - Wait a moment before sending another message
   - Consider upgrading your Perplexity plan for higher limits

### Debug Mode

To see detailed API logs, open browser developer tools (F12) and check the Console tab for error messages.

## 💰 Pricing

Perplexity API pricing varies by model and usage:
- **llama-3.1-sonar-small-128k-online**: Used in this implementation
- Check [Perplexity Pricing](https://www.perplexity.ai/pricing) for current rates
- Monitor your usage in the Perplexity dashboard

## 🔒 Security Notes

- **Never commit API keys to version control**
- **Use environment variables for all sensitive data**
- **Consider using a backend proxy for production** (optional)
- **Monitor API usage and costs regularly**

## 🚀 Production Considerations

For production deployment:
1. **Use environment variables** in your hosting platform
2. **Consider rate limiting** on the frontend
3. **Implement caching** for common queries
4. **Monitor API costs** and usage
5. **Add user authentication** if needed

## 📚 API Documentation

- [Perplexity API Docs](https://docs.perplexity.ai/)
- [Available Models](https://docs.perplexity.ai/docs/models)
- [Rate Limits](https://docs.perplexity.ai/docs/rate-limits)

---

**Your Tamil Nadu Learning Hub chatbot is now powered by Perplexity AI! 🤖✨**
