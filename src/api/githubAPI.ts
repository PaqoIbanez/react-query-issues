import axios from "axios";

export const githubAPI = axios.create({
   baseURL: 'https://api.github.com/repos/facebook/react',
   headers: {
      'Authorization': 'Bearer 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'
   }
})