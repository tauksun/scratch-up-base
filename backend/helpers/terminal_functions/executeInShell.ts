import { exec } from "child_process";

const executeInShell = (command: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
      }
      resolve(stdout);
    });
  });
};

export default executeInShell;
