# **WebIntel - AI-Powered Wikipedia Question Answering Tool**

WebIntel is an AI-driven web application that answers your questions about any Wikipedia page. Leveraging advanced AI, WebIntel simplifies exploring Wikipedia content.

---

## **Features**

- 🔍 **Analyze Any Wikipedia Page**: Process any Wikipedia URL.  
- 🤖 **AI-Powered Responses**: Get precise answers to your questions.  
- ⚡ **Fast and Efficient**: Minimal response times for a smooth experience.  
- 💾 **Caching**: Redis ensures no repeated processing of the same page.  
- 📊 **Contextual Insights**: Extracts the most relevant data for better answers.

---

## **Tech Stack**

### **Frontend**  
- Next.js (App Router)  
- React  
- Tailwind CSS  

### **Backend**  
- Node.js  
- Redis (for caching)  
- AI Integration (OpenAI GPT)  

### **Hosting**  
- Vercel  

---

## **Installation**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/SyedHuzaifa417/webIntel-AiBot.git
   cd webIntel-AiBot

2. Install Dependencies
   ```bash
 
    npm install

3. Set Up Environment Variables
Create a .env file in the root directory with the following:

   ```env
   
   UPSTASH_VECTOR_REST_URL=***********
   UPSTASH_VECTOR_REST_TOKEN=***********
   QSTASH_TOKEN=***********

   UPSTASH_REDIS_REST_URL=***********
   UPSTASH_REDIS_REST_TOKEN=***********
4. Run the Development Server
    ```bash
    npm run dev

## **Usage**

1. Visit the home page.
2. Enter a Wikipedia page URL.
3. Ask any question related to the page.
4. Get instant answers powered by AI.

## **Live Demo**
Try WebIntel: https://webintel.vercel.app

## **Contributing**

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Open a pull request for review.

## **License**
This project is licensed under the MIT License.

