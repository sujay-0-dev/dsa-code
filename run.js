#include <stdio.h>
#include <stdlib.h>

int *stack;
int top = -1;
int MAX;

/* Check if stack is empty */
int isEmpty(){
    if(top == -1)
        return 1;
    else
        return 0;
}

/* Check if stack is full */
int isFull(){
    if(top == MAX-1)
        return 1;
    else
        return 0;
}

/* Push operation */
void push(int val){

    if(isFull()){
        printf("Stack Overflow\n");
        return;
    }

    top++;
    stack[top] = val;

    printf("Inserted: %d\n", val);
}

/* Pop operation */
void pop(){

    if(isEmpty()){
        printf("Stack Underflow\n");
        return;
    }

    printf("Deleted element: %d\n", stack[top]);
    top--;
}

/* Delete entire stack */
void delete_stack(){

    if(isEmpty()){
        printf("Stack already empty\n");
        return;
    }

    top = -1;
    printf("Stack cleared\n");
}

/* Display stack */
void display(){

    if(isEmpty()){
        printf("Stack empty\n");
        return;
    }

    printf("Stack elements:\n");

    for(int i = top; i >= 0; i--){
        printf("%d\n", stack[i]);
    }
}

int main(){

    int choice, val;

    printf("Enter stack size: ");
    scanf("%d", &MAX);

    stack = (int*)malloc(MAX * sizeof(int));

    while(1){

        printf("\n----- Stack (Dynamic Array Implementation) -----\n");
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Check isEmpty\n");
        printf("4. Check isFull\n");
        printf("5. Delete Stack\n");
        printf("6. Display\n");
        printf("7. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch(choice){

            case 1:
                printf("Enter value: ");
                scanf("%d", &val);
                push(val);
                break;

            case 2:
                pop();
                break;

            case 3:
                if(isEmpty())
                    printf("Stack is Empty\n");
                else
                    printf("Stack is NOT Empty\n");
                break;

            case 4:
                if(isFull())
                    printf("Stack is Full\n");
                else
                    printf("Stack is NOT Full\n");
                break;

            case 5:
                delete_stack();
                break;

            case 6:
                display();
                break;

            case 7:
                free(stack);
                exit(0);

            default:
                printf("Invalid choice\n");
        }
    }
}