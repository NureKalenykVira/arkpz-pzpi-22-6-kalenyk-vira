// Рекомендація 1

// Поганий приклад
function prc(n: number): number {
    return n * 0.9;
}

// Гарний приклад
function calculateDiscount(price: number): number {
    return price * 0.9;
}

// Рекомендація 2

// Поганий приклад
let price = 100; // Оголошення змінної price

// Гарний приклад
let price = 100; // Початкова ціна товару без знижки

// Рекомендація 3

// Поганий приклад
function calculateSum(a:number,b:number){return a+b;}

const result=calculateSum(5,10);console.log(result);

// Гарний приклад
function calculateSum(a: number, b: number): number {
    return a + b;
}

const result = calculateSum(5, 10);
console.log(result);

// Рекомендація 4

// Поганий приклад
function processOrder(order: any): void {
    console.log(`Processing order ${order.id}`);
    if (order.status === "new") {
        order.status = "processed";
        console.log("Order processed");
    } else {
        console.log("Order already processed");
    }
    sendEmail(order.customerEmail);
    console.log("Email sent");
}

// Гарний приклад
function processOrder(order: any): void {
    console.log(`Processing order ${order.id}`);
    if (isNewOrder(order)) {
        markOrderAsProcessed(order);
    }
    notifyCustomer(order.customerEmail);
}

function isNewOrder(order: any): boolean {
    return order.status === "new";
}

function markOrderAsProcessed(order: any): void {
    order.status = "processed";
    console.log("Order processed");
}

function notifyCustomer(email: string): void {
    sendEmail(email);
    console.log("Email sent");
}

// Рекомендація 5

// Поганий приклад
function process(x: number, y: number): number {
    return x * (1 + y / 100);
}
// Гарний приклад
function calculateDeposit(initialAmount: number, interestRate: number): number {
    return initialAmount * (1 + interestRate / 100);
}

// Рекомендація 6

// Поганий приклад
function getUser(id: number): User {
    return fetch(`/api/user/${id}`).then(response => response.json());
}
function addProduct(name: string, price: number): void {
    console.log("Adding product:", name, price);
    // Implementation omitted
}

// Гарний приклад
function getUser(id: number): Promise<User> {
    return fetch(`/api/user/${id}`).then(response => response.json());
}
function addProduct(name: string, price: number): Promise<void> {
    console.log("Adding product:", name, price);
    return Promise.resolve();
}

// Рекомендація 7

// Поганий приклад
function calculateInterest(amount:number){
    return amount * 0.05;}
    
    function calculateTotal(amount:number){
        let interest = calculateInterest(amount);
    return amount + interest;
    }
    
    // Гарний приклад
    function calculateInterest(amount: number): number {
        return amount * 0.05;
    }
    
    function calculateTotal(amount: number): number {
        let interest = calculateInterest(amount);
        return amount + interest;
    }

// Рекомендація 8

// Поганий приклад
if (amount > 100) return "High value";
else return "Low value";

// Гарний приклад
if (amount > 100) {
    return "High value";
} else {
    return "Low value";
}

// Рекомендація 9

// Поганий приклад
const isEligible = age > 18 && income > 30000 && creditScore > 700;

// Гарний приклад
const isEligible = age > 18 &&
                   income > 30000 &&
                   creditScore > 700;


// Приклад коду до та після застовування всіх рекомендацій

// Фрагмент неформатованого коду:
function prc(x, y) { if(x > 100) return x * (1 + y/100); else return x;}
                   
let n = 100; // ціна
console.log(prc(n,10));let isValid = true&&x > 50&&y<20;
                   
function f(a,b){if(a+b >100) return "OK";else return "Not OK";}
function g(id){fetch("/user/" + id).then(r => r.json())}
                   
// Той самий код після форматування:

    // Розрахунок суми з урахуванням відсотка
    function calculateTotal(amount: number, rate: number): number {
        if (amount > 100) {
            return amount * (1 + rate / 100); // Застосування відсоткової ставки
        } else {
            return amount; // Якщо сума менше 100, відсоток не додається
        }
    }
                   
    const initialPrice = 100; // Початкова ціна товару
    const discountRate = 10; // Відсоток знижки
    console.log(calculateTotal(initialPrice, discountRate));
                   
    // Перевірка кількох умов із вирівнюванням операторів
    const isValid = true &&
                    x > 50 &&
                    y < 20;
                   
    // Оцінка суми
    function evaluateSum(a: number, b: number): string {
        if (a + b > 100) {
            return "OK";
        } else {
            return "Not OK";
        }
    }
                   
    // Отримання користувача за ID
        function getUserById(id: number): Promise<any> {
            return fetch(`/user/${id}`).then((response) => response.json());
        }
