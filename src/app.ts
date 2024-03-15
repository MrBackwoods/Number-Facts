// Required modules
import fetch from 'node-fetch';
import * as readline from 'readline'; 

// API response interface
interface ApiResponse {
    ok: boolean;
    text: () => Promise<string>;
}

// Gete fact from API
async function fetchNumberFact(number: number): Promise<void> {
    try {
        const response: ApiResponse = await fetch(`http://numbersapi.com/${number}/math`);
        if (response.ok) {
            const data: string = await response.text();
            console.log(data);
        } else {
            throw new Error('Failed to fetch number fact.');
        }
    } catch (error:any) {
        console.error('Error fetching number fact:', error.message);
    }
}

// Prompting the user
function promptUser(): void {
    const readlineInterface: readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readlineInterface.question('Enter a number: ', (input: string) => {
        const number: number = parseInt(input);
        if (isNaN(number)) {
            console.error('Invalid input.');
        } else {
            fetchNumberFact(number);
        }
        readlineInterface.close();
    });
}

// Handling unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Calling the function to start the prompt for user input
promptUser();
