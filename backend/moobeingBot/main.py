import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

api_key = os.getenv("OPENAI_API_KEY")

model = ChatOpenAI(model="gpt-3.5-turbo", openai_api_key=api_key)  # API 키 적용
data_loader = UnstructuredFileLoader("info.txt")
splitter = CharacterTextSplitter.from_tiktoken_encoder(
    separator="\n",
    chunk_size=500,
    chunk_overlap=50
)
docs = data_loader.load_and_split(text_splitter=splitter)
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever()


class QueryRequest(BaseModel):
    question: str


async def get_rag_response(question: str) -> str:
    documents = retriever.get_relevant_documents(question)

    if not documents:
        raise HTTPException(status_code=404, detail="No relevant documents found")

    context = "\n".join([doc.page_content for doc in documents])

    reduce_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """
                주어진 문장들을 이용해 최종 답변을 작성해주세요. 만약 주어진 문장들 내에 답변을 위한 내용이 포함되어있지 않다면, 답변을 꾸며내지 말고, 모른다고 답해주세요.
                ------
                {context}
                """,
            ),
            ("human", "{question}"),
        ]
    )

    response = model.call({"context": context, "question": question})

    return response


@app.post("/rag-query")
async def rag_query(query: QueryRequest):
    try:
        answer = await get_rag_response(query.question)
        return {"question": query.question, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
