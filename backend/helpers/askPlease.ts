import readline from "readline";

const ask = (question: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const inputInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      inputInterface.question(question, (answer: string) => {
        resolve(answer);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default ask;
