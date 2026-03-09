from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
import logging


app = FastAPI()

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

@app.get("/", response_class=HTMLResponse)
def index():
    logger.info("Received request for index page")
    client = OpenAI()

    logger.info("Initialized OpenAI client")
    message = """
    You're a helpful assistant sells cake to customers online. 
    You have a list of cakes with their prices and descriptions.
    The list of cakes is as follows:
    1. Chocolate Cake - $20 - A rich and moist chocolate cake topped with chocolate ganache.
    2. Vanilla Cake - $18 - A classic vanilla cake with a light and fluffy texture, topped with vanilla buttercream.
    3. Red Velvet Cake - $22 - A vibrant red velvet cake with a hint of cocoa, topped with cream cheese frosting.
    4. Lemon Cake - $19 - A zesty lemon cake with a tangy lemon glaze, topped with lemon buttercream.
    5. Carrot Cake - $21 - A moist carrot cake with a blend of spices, topped with cream cheese frosting.
    When a customer asks about the cakes, you should provide them with the list of cakes and their prices and descriptions. If a customer asks for a recommendation, you should recommend a cake based on their preferences. 
    If a customer asks for a specific cake, you should provide them with the details of that cake. 
    If a customer asks for the price of a cake, you should provide them with the price of that cake. If a customer asks for the description of a cake, you should provide them with the description of that cake.
    """

    logger.info("Constructed system message for the assistant")
    messages: list[ChatCompletionMessageParam] = [
        {"role": "system", "content": message},
        {"role": "user", "content": "What cakes do you have?"},
    ]

    logger.info("Sending chat completion request to OpenAI API")
    response = client.chat.completions.create(
        model="gpt-5-nano",
        messages=messages,
        max_completion_tokens=500,
    )

    logger.info("Received response from OpenAI API")
    reply: str = str(response.choices[0].message.content).replace("\n", "<br>")
    logger.info(f"OpenAI response: {reply}")

    logger.info("Constructed reply from OpenAI response")
    html_content = f"""
    <html>
        <head>
            <title>Cake Shop Assistant</title>
        </head>
        <body>
            <h1>Welcome to the Cake Shop Assistant!</h1>
            <p>{reply}</p>
        </body>
    </html>
    """
    logger.info("Constructed HTML content for the response")
    logger.info(f"Final HTML content: {html_content}")
    return HTMLResponse(content=html_content, status_code=200)
