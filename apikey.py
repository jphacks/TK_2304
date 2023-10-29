import os

def main():
    chatGptKey = input("Please input your ChatGPT API key: ")
    translateApiKey = input("Please input your Cloud Translation API key: ")

    f = open("./camembert-chat/src/ChatGptApi.js", "w")
    l = ["const ChatGpiApi = () => {\n", "  const key = \"", chatGptKey, "\";\n", "  return key;\n", "};\n", "export default ChatGpiApi;\n"]
    f.writelines(l)
    f.close()

    f = open("./camembert-chat/src/TranslateApi.js", "w")
    l = ["const TranslateApi = () => {\n", "  const key = \"", translateApiKey, "\";\n", "  return key;\n", "};\n", "export default TranslateApi;\n"]
    f.writelines(l)
    f.close()


if __name__ == "__main__":
    main()
