const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

/* Single Linked List */
app.get("/sll", (req, res) => {
  res.send(`

#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
};

struct node *head = NULL;

/* Insert at beginning */
void insert_begin(int val)
{
    struct node *newnode = (struct node *)malloc(sizeof(struct node));
    newnode->data = val;
    newnode->next = head;
    head = newnode;
}

/* Insert at end */
void insert_end(int val)
{
    struct node *newnode = (struct node *)malloc(sizeof(struct node));
    struct node *temp = head;

    newnode->data = val;
    newnode->next = NULL;

    if (head == NULL)
    {
        head = newnode;
        return;
    }

    while (temp->next != NULL)
        temp = temp->next;

    temp->next = newnode;
}

/* Insert at position */
void insert_pos(int val, int pos)
{
    struct node *newnode = (struct node *)malloc(sizeof(struct node));
    struct node *temp = head;

    newnode->data = val;

    for (int i = 1; i < pos - 1; i++)
    {
        if (temp == NULL)
        {
            printf("Invalid position");
            return;
        }
        temp = temp->next;
    }

    newnode->next = temp->next;
    temp->next = newnode;
}

/* Delete from beginning */
void delete_begin()
{
    if (head == NULL)
    {
        printf("List is empty");
        return;
    }

    struct node *temp = head;
    head = head->next;
    free(temp);
}

/* Delete from end */
void delete_end()
{
    if (head == NULL)
    {
        printf("List empty");
        return;
    }

    struct node *temp = head;

    if (head->next == NULL)
    {
        free(head);
        head = NULL;
        return;
    }

    while (temp->next->next != NULL)
        temp = temp->next;

    free(temp->next);
    temp->next = NULL;
}

/* Delete at position */
void delete_pos(int pos)
{

    if (head == NULL)
    {
        printf("List empty");
        return;
    }

    struct node *temp = head;

    for (int i = 1; i < pos - 1; i++)
    {
        temp = temp->next;
        if (temp == NULL)
        {
            printf("Invalid position");
            return;
        }
    }

    struct node *del = temp->next;

    if (del == NULL)
    {
        printf("Invalid position");
        return;
    }

    temp->next = del->next;
    free(del);
}

/* Reverse linked list */
void reverse()
{

    struct node *prev = NULL;
    struct node *current = head;
    struct node *next = NULL;

    while (current != NULL)
    {

        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    head = prev;
}

/* Display list */
void display()
{

    struct node *temp = head;

    if (temp == NULL)
    {
        printf("List empty");
        return;
    }

    while (temp != NULL)
    {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }

    printf("NULL");
}

/* Main menu */
int main()
{

    int choice, val, pos;

    while (1)
    {

        printf("------ Single Linked List ------");
        printf("1. Insert at Beginning");
        printf("2. Insert at End");
        printf("3. Insert at Position");
        printf("4. Delete from Beginning");
        printf("5. Delete from End");
        printf("6. Delete from Position");
        printf("7. Reverse List");
        printf("8. Display");
        printf("9. Exit");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            insert_begin(val);
            break;

        case 2:
            printf("Enter value: ");
            scanf("%d", &val);
            insert_end(val);
            break;

        case 3:
            printf("Enter value and position: ");
            scanf("%d %d", &val, &pos);
            insert_pos(val, pos);
            break;

        case 4:
            delete_begin();
            break;

        case 5:
            delete_end();
            break;

        case 6:
            printf("Enter position: ");
            scanf("%d", &pos);
            delete_pos(pos);
            break;

        case 7:
            reverse();
            printf("List reversed");
            break;

        case 8:
            display();
            break;

        case 9:
            exit(0);

        default:
            printf("Invalid choice");
        }
    }
}
`);
});

/* Doubly Linked List */
app.get("/dll", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *prev;
    struct node *next;
};

struct node *head = NULL;

/* Insert at beginning */
void insert_begin(int val)
{

    struct node *newnode = (struct node *)malloc(sizeof(struct node));

    newnode->data = val;
    newnode->prev = NULL;
    newnode->next = head;

    if (head != NULL)
        head->prev = newnode;

    head = newnode;
}

/* Insert at end */
void insert_end(int val)
{

    struct node *newnode = (struct node *)malloc(sizeof(struct node));
    struct node *temp = head;

    newnode->data = val;
    newnode->next = NULL;

    if (head == NULL)
    {
        newnode->prev = NULL;
        head = newnode;
        return;
    }

    while (temp->next != NULL)
        temp = temp->next;

    temp->next = newnode;
    newnode->prev = temp;
}

/* Insert at position */
void insert_pos(int val, int pos)
{

    struct node *newnode = (struct node *)malloc(sizeof(struct node));
    struct node *temp = head;

    newnode->data = val;

    for (int i = 1; i < pos - 1; i++)
    {

        if (temp == NULL)
        {
            printf("Invalid position\n");
            return;
        }

        temp = temp->next;
    }

    newnode->next = temp->next;
    newnode->prev = temp;

    if (temp->next != NULL)
        temp->next->prev = newnode;

    temp->next = newnode;
}

/* Delete from beginning */
void delete_begin()
{

    if (head == NULL)
    {
        printf("List empty\n");
        return;
    }

    struct node *temp = head;

    head = head->next;

    if (head != NULL)
        head->prev = NULL;

    free(temp);
}

/* Delete from end */
void delete_end()
{

    if (head == NULL)
    {
        printf("List empty\n");
        return;
    }

    struct node *temp = head;

    if (head->next == NULL)
    {
        free(head);
        head = NULL;
        return;
    }

    while (temp->next != NULL)
        temp = temp->next;

    temp->prev->next = NULL;
    free(temp);
}

/* Delete at position */
void delete_pos(int pos)
{

    struct node *temp = head;

    for (int i = 1; i < pos; i++)
    {

        if (temp == NULL)
        {
            printf("Invalid position\n");
            return;
        }

        temp = temp->next;
    }

    if (temp == NULL)
    {
        printf("Invalid position\n");
        return;
    }

    if (temp->prev != NULL)
        temp->prev->next = temp->next;

    if (temp->next != NULL)
        temp->next->prev = temp->prev;

    if (temp == head)
        head = temp->next;

    free(temp);
}

/* Reverse doubly linked list */
void reverse()
{

    struct node *temp = NULL;
    struct node *current = head;

    while (current != NULL)
    {

        temp = current->prev;
        current->prev = current->next;
        current->next = temp;

        current = current->prev;
    }

    if (temp != NULL)
        head = temp->prev;
}

/* Display list */
void display()
{

    struct node *temp = head;

    if (temp == NULL)
    {
        printf("List empty\n");
        return;
    }

    while (temp != NULL)
    {
        printf("%d <-> ", temp->data);
        temp = temp->next;
    }

    printf("NULL\n");
}

/* Main Menu */
int main()
{

    int choice, val, pos;

    while (1)
    {

        printf("\n------ Doubly Linked List ------\n");
        printf("1. Insert at Beginning\n");
        printf("2. Insert at End\n");
        printf("3. Insert at Position\n");
        printf("4. Delete from Beginning\n");
        printf("5. Delete from End\n");
        printf("6. Delete from Position\n");
        printf("7. Reverse List\n");
        printf("8. Display\n");
        printf("9. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            insert_begin(val);
            break;

        case 2:
            printf("Enter value: ");
            scanf("%d", &val);
            insert_end(val);
            break;

        case 3:
            printf("Enter value and position: ");
            scanf("%d %d", &val, &pos);
            insert_pos(val, pos);
            break;

        case 4:
            delete_begin();
            break;

        case 5:
            delete_end();
            break;

        case 6:
            printf("Enter position: ");
            scanf("%d", &pos);
            delete_pos(pos);
            break;

        case 7:
            reverse();
            printf("List reversed\n");
            break;

        case 8:
            display();
            break;

        case 9:
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Circular Linked List */
app.get("/cll", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
};

struct node *last = NULL;

/* Insert at beginning */
void insert_begin(int val)
{

    struct node *newnode = malloc(sizeof(struct node));
    newnode->data = val;

    if (last == NULL)
    {
        last = newnode;
        last->next = last;
        return;
    }

    newnode->next = last->next;
    last->next = newnode;
}

/* Insert at end */
void insert_end(int val)
{

    struct node *newnode = malloc(sizeof(struct node));
    newnode->data = val;

    if (last == NULL)
    {
        last = newnode;
        last->next = last;
        return;
    }

    newnode->next = last->next;
    last->next = newnode;
    last = newnode;
}

/* Insert at position */
void insert_pos(int val, int pos)
{

    struct node *newnode = malloc(sizeof(struct node));
    newnode->data = val;

    struct node *temp = last->next;

    for (int i = 1; i < pos - 1; i++)
    {
        temp = temp->next;

        if (temp == last->next)
        {
            printf("Invalid position\n");
            return;
        }
    }

    newnode->next = temp->next;
    temp->next = newnode;

    if (temp == last)
        last = newnode;
}

/* Delete from beginning */
void delete_begin()
{

    if (last == NULL)
    {
        printf("List empty\n");
        return;
    }

    struct node *temp = last->next;

    if (last->next == last)
    {
        last = NULL;
        free(temp);
        return;
    }

    last->next = temp->next;
    free(temp);
}

/* Delete from end */
void delete_end()
{

    if (last == NULL)
    {
        printf("List empty\n");
        return;
    }

    struct node *temp = last->next;

    if (last->next == last)
    {
        free(last);
        last = NULL;
        return;
    }

    while (temp->next != last)
        temp = temp->next;

    temp->next = last->next;
    free(last);
    last = temp;
}

/* Delete at position */
void delete_pos(int pos)
{

    struct node *temp = last->next;

    for (int i = 1; i < pos - 1; i++)
    {
        temp = temp->next;

        if (temp == last->next)
        {
            printf("Invalid position\n");
            return;
        }
    }

    struct node *del = temp->next;

    temp->next = del->next;

    if (del == last)
        last = temp;

    free(del);
}

/* Reverse circular linked list */
void reverse()
{

    if (last == NULL || last->next == last)
        return;

    struct node *prev = last;
    struct node *curr = last->next;
    struct node *next;

    do
    {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    } while (curr != last->next);

    last = curr;
}

/* Display */
void display()
{

    if (last == NULL)
    {
        printf("List empty\n");
        return;
    }

    struct node *temp = last->next;

    do
    {
        printf("%d -> ", temp->data);
        temp = temp->next;
    } while (temp != last->next);

    printf("(back to head)\n");
}

/* Main menu */
int main()
{

    int ch, val, pos;

    while (1)
    {

        printf("\n----- Circular Linked List -----\n");
        printf("1.Insert Beginning\n");
        printf("2.Insert End\n");
        printf("3.Insert Position\n");
        printf("4.Delete Beginning\n");
        printf("5.Delete End\n");
        printf("6.Delete Position\n");
        printf("7.Reverse\n");
        printf("8.Display\n");
        printf("9.Exit\n");

        printf("Enter choice: ");
        scanf("%d", &ch);

        switch (ch)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            insert_begin(val);
            break;

        case 2:
            printf("Enter value: ");
            scanf("%d", &val);
            insert_end(val);
            break;

        case 3:
            printf("Enter value and position: ");
            scanf("%d%d", &val, &pos);
            insert_pos(val, pos);
            break;

        case 4:
            delete_begin();
            break;

        case 5:
            delete_end();
            break;

        case 6:
            printf("Enter position: ");
            scanf("%d", &pos);
            delete_pos(pos);
            break;

        case 7:
            reverse();
            printf("List reversed\n");
            break;

        case 8:
            display();
            break;

        case 9:
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Stack using array */
app.get("/stack-sa", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

#define MAX 10

int stack[MAX];
int top = -1;

/* Check if stack is empty */
int isEmpty()
{
    if (top == -1)
        return 1;
    else
        return 0;
}

/* Check if stack is full */
int isFull()
{
    if (top == MAX - 1)
        return 1;
    else
        return 0;
}

/* Push operation */
void push(int val)
{

    if (isFull())
    {
        printf("Stack Overflow\n");
        return;
    }

    top++;
    stack[top] = val;

    printf("Inserted: %d\n", val);
}

/* Pop operation */
void pop()
{

    if (isEmpty())
    {
        printf("Stack Underflow\n");
        return;
    }

    printf("Deleted element: %d\n", stack[top]);
    top--;
}

/* Delete entire stack */
void delete_stack()
{

    if (isEmpty())
    {
        printf("Stack already empty\n");
        return;
    }

    top = -1;
    printf("Stack cleared\n");
}

/* Display stack */
void display()
{

    if (isEmpty())
    {
        printf("Stack empty\n");
        return;
    }

    printf("Stack elements:\n");

    for (int i = top; i >= 0; i--)
    {
        printf("%d\n", stack[i]);
    }
}

/* Main menu */
int main()
{

    int choice, val;

    while (1)
    {

        printf("\n----- Stack (Array Implementation) -----\n");
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Check isEmpty\n");
        printf("4. Check isFull\n");
        printf("5. Delete Stack\n");
        printf("6. Display\n");
        printf("7. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            push(val);
            break;

        case 2:
            pop();
            break;

        case 3:
            if (isEmpty())
                printf("Stack is Empty\n");
            else
                printf("Stack is NOT Empty\n");
            break;

        case 4:
            if (isFull())
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
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Stack Using Dynamic Array*/
app.get("/stack-da", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

int *stack;
int top = -1;
int MAX;

/* Check if stack is empty */
int isEmpty()
{
    if (top == -1)
        return 1;
    else
        return 0;
}

/* Check if stack is full */
int isFull()
{
    if (top == MAX - 1)
        return 1;
    else
        return 0;
}

/* Push operation */
void push(int val)
{

    if (isFull())
    {
        printf("Stack Overflow\n");
        return;
    }

    top++;
    stack[top] = val;

    printf("Inserted: %d\n", val);
}

/* Pop operation */
void pop()
{

    if (isEmpty())
    {
        printf("Stack Underflow\n");
        return;
    }

    printf("Deleted element: %d\n", stack[top]);
    top--;
}

/* Delete entire stack */
void delete_stack()
{

    if (isEmpty())
    {
        printf("Stack already empty\n");
        return;
    }

    top = -1;
    printf("Stack cleared\n");
}

/* Display stack */
void display()
{

    if (isEmpty())
    {
        printf("Stack empty\n");
        return;
    }

    printf("Stack elements:\n");

    for (int i = top; i >= 0; i--)
    {
        printf("%d\n", stack[i]);
    }
}

int main()
{

    int choice, val;

    printf("Enter stack size: ");
    scanf("%d", &MAX);

    stack = (int *)malloc(MAX * sizeof(int));

    while (1)
    {

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

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            push(val);
            break;

        case 2:
            pop();
            break;

        case 3:
            if (isEmpty())
                printf("Stack is Empty\n");
            else
                printf("Stack is NOT Empty\n");
            break;

        case 4:
            if (isFull())
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
`);
});

/* Stack Using Linked List */
app.get("/stack-ll", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
};

struct node *top = NULL;

/* Check if stack is empty */
int isEmpty()
{
    if (top == NULL)
        return 1;
    else
        return 0;
}

/* Check if stack is full (memory availability) */
int isFull()
{
    struct node *temp = (struct node *)malloc(sizeof(struct node));

    if (temp == NULL)
        return 1;
    else
    {
        free(temp);
        return 0;
    }
}

/* Push operation */
void push(int val)
{

    if (isFull())
    {
        printf("Stack Overflow\n");
        return;
    }

    struct node *newnode = (struct node *)malloc(sizeof(struct node));

    newnode->data = val;
    newnode->next = top;
    top = newnode;

    printf("Inserted: %d\n", val);
}

/* Pop operation */
void pop()
{

    if (isEmpty())
    {
        printf("Stack Underflow\n");
        return;
    }

    struct node *temp = top;

    printf("Deleted element: %d\n", top->data);

    top = top->next;
    free(temp);
}

/* Delete entire stack */
void delete_stack()
{

    struct node *temp;

    while (top != NULL)
    {
        temp = top;
        top = top->next;
        free(temp);
    }

    printf("Stack cleared\n");
}

/* Display stack */
void display()
{

    if (isEmpty())
    {
        printf("Stack is empty\n");
        return;
    }

    struct node *temp = top;

    printf("Stack elements:\n");

    while (temp != NULL)
    {
        printf("%d\n", temp->data);
        temp = temp->next;
    }
}

/* Main menu */
int main()
{

    int choice, val;

    while (1)
    {

        printf("\n----- Stack (Linked List Implementation) -----\n");
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Check isEmpty\n");
        printf("4. Check isFull\n");
        printf("5. Delete Stack\n");
        printf("6. Display\n");
        printf("7. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            push(val);
            break;

        case 2:
            pop();
            break;

        case 3:
            if (isEmpty())
                printf("Stack is Empty\n");
            else
                printf("Stack is NOT Empty\n");
            break;

        case 4:
            if (isFull())
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
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Queue Using Static Array */
app.get("/queue-sa", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

#define MAX 10

int queue[MAX];
int front = -1;
int rear = -1;

/* Check if queue is empty */
int isEmpty()
{
    if (front == -1 || front > rear)
        return 1;
    else
        return 0;
}

/* Check if queue is full */
int isFull()
{
    if (rear == MAX - 1)
        return 1;
    else
        return 0;
}

/* Push (Enqueue) */
void push(int val)
{

    if (isFull())
    {
        printf("Queue Overflow\n");
        return;
    }

    if (front == -1)
        front = 0;

    rear++;
    queue[rear] = val;

    printf("Inserted: %d\n", val);
}

/* Pop (Dequeue) */
void pop()
{

    if (isEmpty())
    {
        printf("Queue Underflow\n");
        return;
    }

    printf("Deleted element: %d\n", queue[front]);
    front++;
}

/* Delete entire queue */
void delete_queue()
{

    if (isEmpty())
    {
        printf("Queue already empty\n");
        return;
    }

    front = rear = -1;
    printf("Queue cleared\n");
}

/* Display queue */
void display()
{

    if (isEmpty())
    {
        printf("Queue empty\n");
        return;
    }

    printf("Queue elements:\n");

    for (int i = front; i <= rear; i++)
        printf("%d ", queue[i]);

    printf("\n");
}

/* Main menu */
int main()
{

    int choice, val;

    while (1)
    {

        printf("\n----- Queue (Array Implementation) -----\n");
        printf("1. Push (Enqueue)\n");
        printf("2. Pop (Dequeue)\n");
        printf("3. Check isEmpty\n");
        printf("4. Check isFull\n");
        printf("5. Delete Queue\n");
        printf("6. Display\n");
        printf("7. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            push(val);
            break;

        case 2:
            pop();
            break;

        case 3:
            if (isEmpty())
                printf("Queue is Empty\n");
            else
                printf("Queue is NOT Empty\n");
            break;

        case 4:
            if (isFull())
                printf("Queue is Full\n");
            else
                printf("Queue is NOT Full\n");
            break;

        case 5:
            delete_queue();
            break;

        case 6:
            display();
            break;

        case 7:
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Queue Using Dynamic Array */
app.get("/queue-da", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

int *queue;
int front = -1;
int rear = -1;
int MAX;

/* Check if queue is empty */
int isEmpty()
{
    if (front == -1 || front > rear)
        return 1;
    else
        return 0;
}

/* Check if queue is full */
int isFull()
{
    if (rear == MAX - 1)
        return 1;
    else
        return 0;
}

/* Push (Enqueue) */
void push(int val)
{

    if (isFull())
    {
        printf("Queue Overflow\n");
        return;
    }

    if (front == -1)
        front = 0;

    rear++;
    queue[rear] = val;

    printf("Inserted: %d\n", val);
}

/* Pop (Dequeue) */
void pop()
{

    if (isEmpty())
    {
        printf("Queue Underflow\n");
        return;
    }

    printf("Deleted element: %d\n", queue[front]);
    front++;
}

/* Delete entire queue */
void delete_queue()
{

    if (isEmpty())
    {
        printf("Queue already empty\n");
        return;
    }

    front = rear = -1;
    printf("Queue cleared\n");
}

/* Display queue */
void display()
{

    if (isEmpty())
    {
        printf("Queue empty\n");
        return;
    }

    printf("Queue elements:\n");

    for (int i = front; i <= rear; i++)
        printf("%d ", queue[i]);

    printf("\n");
}

/* Main menu */
int main()
{

    int choice, val;

    printf("Enter queue size: ");
    scanf("%d", &MAX);

    queue = (int *)malloc(MAX * sizeof(int));

    while (1)
    {

        printf("\n----- Queue (Dynamic Array Implementation) -----\n");
        printf("1. Push (Enqueue)\n");
        printf("2. Pop (Dequeue)\n");
        printf("3. Check isEmpty\n");
        printf("4. Check isFull\n");
        printf("5. Delete Queue\n");
        printf("6. Display\n");
        printf("7. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            push(val);
            break;

        case 2:
            pop();
            break;

        case 3:
            if (isEmpty())
                printf("Queue is Empty\n");
            else
                printf("Queue is NOT Empty\n");
            break;

        case 4:
            if (isFull())
                printf("Queue is Full\n");
            else
                printf("Queue is NOT Full\n");
            break;

        case 5:
            delete_queue();
            break;

        case 6:
            display();
            break;

        case 7:
            free(queue);
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Queue Using Linked List */
app.get("/queue-ll", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
};

struct node *front = NULL;
struct node *rear = NULL;

/* Check if queue is empty */
int isEmpty()
{
    if (front == NULL)
        return 1;
    else
        return 0;
}

/* Check if queue is full (memory check) */
int isFull()
{
    struct node *temp = (struct node *)malloc(sizeof(struct node));

    if (temp == NULL)
        return 1;
    else
    {
        free(temp);
        return 0;
    }
}

/* Push (Enqueue) */
void push(int val)
{

    if (isFull())
    {
        printf("Queue Overflow\n");
        return;
    }

    struct node *newnode = (struct node *)malloc(sizeof(struct node));

    newnode->data = val;
    newnode->next = NULL;

    if (front == NULL)
    {
        front = rear = newnode;
    }
    else
    {
        rear->next = newnode;
        rear = newnode;
    }

    printf("Inserted: %d\n", val);
}

/* Pop (Dequeue) */
void pop()
{

    if (isEmpty())
    {
        printf("Queue Underflow\n");
        return;
    }

    struct node *temp = front;

    printf("Deleted element: %d\n", front->data);

    front = front->next;

    if (front == NULL)
        rear = NULL;

    free(temp);
}

/* Delete entire queue */
void delete_queue()
{

    struct node *temp;

    while (front != NULL)
    {
        temp = front;
        front = front->next;
        free(temp);
    }

    rear = NULL;
    printf("Queue cleared\n");
}

/* Display queue */
void display()
{

    if (isEmpty())
    {
        printf("Queue is empty\n");
        return;
    }

    struct node *temp = front;

    printf("Queue elements:\n");

    while (temp != NULL)
    {
        printf("%d ", temp->data);
        temp = temp->next;
    }

    printf("\n");
}

/* Main Menu */
int main()
{

    int choice, val;

    while (1)
    {

        printf("\n----- Queue (Linked List Implementation) -----\n");
        printf("1. Push (Enqueue)\n");
        printf("2. Pop (Dequeue)\n");
        printf("3. Check isEmpty\n");
        printf("4. Check isFull\n");
        printf("5. Delete Queue\n");
        printf("6. Display\n");
        printf("7. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            push(val);
            break;

        case 2:
            pop();
            break;

        case 3:
            if (isEmpty())
                printf("Queue is Empty\n");
            else
                printf("Queue is NOT Empty\n");
            break;

        case 4:
            if (isFull())
                printf("Queue is Full\n");
            else
                printf("Queue is NOT Full\n");
            break;

        case 5:
            delete_queue();
            break;

        case 6:
            display();
            break;

        case 7:
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});
/* Queue */
app.get("/queue", (req, res) => {
  res.send(`
#include<stdio.h>
#define MAX 5

int queue[MAX];
int front=-1,rear=-1;

void enqueue(int x){
    if(rear==MAX-1) printf("Overflow");
    else{
        if(front==-1) front=0;
        queue[++rear]=x;
    }
}

void dequeue(){
    if(front==-1 || front>rear) printf("Underflow");
    else front++;
}

void display(){
    for(int i=front;i<=rear;i++)
        printf("%d ",queue[i]);
}

int main(){
    enqueue(10);
    enqueue(20);
    enqueue(30);
    display();
}
`);
});

/* Circular Queue Using Array */
app.get("/queue-cl", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

#define MAX 10

int queue[MAX];
int front = -1;
int rear = -1;

/* Check if queue is empty */
int isEmpty()
{
    if (front == -1)
        return 1;
    else
        return 0;
}

/* Check if queue is full */
int isFull()
{
    if ((rear + 1) % MAX == front)
        return 1;
    else
        return 0;
}

/* Push (Enqueue) */
void push(int val)
{

    if (isFull())
    {
        printf("Queue Overflow\n");
        return;
    }

    if (front == -1)
    {
        front = rear = 0;
    }
    else
    {
        rear = (rear + 1) % MAX;
    }

    queue[rear] = val;

    printf("Inserted: %d\n", val);
}

/* Pop (Dequeue) */
void pop()
{

    if (isEmpty())
    {
        printf("Queue Underflow\n");
        return;
    }

    printf("Deleted element: %d\n", queue[front]);

    if (front == rear)
    {
        front = rear = -1;
    }
    else
    {
        front = (front + 1) % MAX;
    }
}

/* Delete entire queue */
void delete_queue()
{

    if (isEmpty())
    {
        printf("Queue already empty\n");
        return;
    }

    front = rear = -1;
    printf("Queue cleared\n");
}

/* Display queue */
void display()
{

    if (isEmpty())
    {
        printf("Queue empty\n");
        return;
    }

    printf("Queue elements:\n");

    int i = front;

    while (1)
    {

        printf("%d ", queue[i]);

        if (i == rear)
            break;

        i = (i + 1) % MAX;
    }

    printf("\n");
}

/* Main menu */
int main()
{

    int choice, val;

    while (1)
    {

        printf("\n----- Circular Queue (Array Implementation) -----\n");
        printf("1. Push (Enqueue)\n");
        printf("2. Pop (Dequeue)\n");
        printf("3. Check isEmpty\n");
        printf("4. Check isFull\n");
        printf("5. Delete Queue\n");
        printf("6. Display\n");
        printf("7. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            printf("Enter value: ");
            scanf("%d", &val);
            push(val);
            break;

        case 2:
            pop();
            break;

        case 3:
            if (isEmpty())
                printf("Queue is Empty\n");
            else
                printf("Queue is NOT Empty\n");
            break;

        case 4:
            if (isFull())
                printf("Queue is Full\n");
            else
                printf("Queue is NOT Full\n");
            break;

        case 5:
            delete_queue();
            break;

        case 6:
            display();
            break;

        case 7:
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Binary Tree Traversal */
app.get("/binary-tree", (req, res) => {
  res.send(`
#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *left;
    struct node *right;
};

/* Create Binary Tree */
struct node *create()
{

    int val;
    struct node *newnode;

    printf("Enter data (-1 for no node): ");
    scanf("%d", &val);

    if (val == -1)
        return NULL;

    newnode = (struct node *)malloc(sizeof(struct node));

    newnode->data = val;

    printf("Enter left child of %d\n", val);
    newnode->left = create();

    printf("Enter right child of %d\n", val);
    newnode->right = create();

    return newnode;
}

/* Inorder Traversal */
void inorder(struct node *root)
{

    if (root != NULL)
    {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

/* Preorder Traversal */
void preorder(struct node *root)
{

    if (root != NULL)
    {
        printf("%d ", root->data);
        preorder(root->left);
        preorder(root->right);
    }
}

/* Postorder Traversal */
void postorder(struct node *root)
{

    if (root != NULL)
    {
        postorder(root->left);
        postorder(root->right);
        printf("%d ", root->data);
    }
}

/* Main Menu */
int main()
{

    struct node *root = NULL;
    int choice;

    while (1)
    {

        printf("\n------ Binary Tree Menu ------\n");
        printf("1. Create Tree\n");
        printf("2. Inorder Traversal\n");
        printf("3. Preorder Traversal\n");
        printf("4. Postorder Traversal\n");
        printf("5. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch (choice)
        {

        case 1:
            root = create();
            break;

        case 2:
            printf("Inorder Traversal: ");
            inorder(root);
            printf("\n");
            break;

        case 3:
            printf("Preorder Traversal: ");
            preorder(root);
            printf("\n");
            break;

        case 4:
            printf("Postorder Traversal: ");
            postorder(root);
            printf("\n");
            break;

        case 5:
            exit(0);

        default:
            printf("Invalid choice\n");
        }
    }
}
`);
});

/* Menu Driven Binary Search Tree */
app.get("/bst", (req, res) => {
  res.send(`

#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *left;
    struct node *right;
};

/* Create new node */
struct node *createNode(int val)
{
    struct node *newnode = (struct node *)malloc(sizeof(struct node));

    newnode->data = val;
    newnode->left = NULL;
    newnode->right = NULL;

    return newnode;
}

/* Insert into BST */
struct node *insert(struct node *root, int val)
{

    if (root == NULL)
        return createNode(val);

    if (val < root->data)
        root->left = insert(root->left, val);

    else if (val > root->data)
        root->right = insert(root->right, val);

    return root;
}

/* Search in BST */
struct node *search(struct node *root, int key)
{

    if (root == NULL || root->data == key)
        return root;

    if (key < root->data)
        return search(root->left, key);

    else
        return search(root->right, key);
}

/* Find minimum value node */
struct node *findMin(struct node *root)
{

    while (root->left != NULL)
        root = root->left;

    return root;
}

/* Delete node from BST */
struct node *deleteNode(struct node *root, int key)
{

    if (root == NULL)
        return root;

    if (key < root->data)
        root->left = deleteNode(root->left, key);

    else if (key > root->data)
        root->right = deleteNode(root->right, key);

    else
    {

        if (root->left == NULL)
        {
            struct node *temp = root->right;
            free(root);
            return temp;
        }

        else if (root->right == NULL)
        {
            struct node *temp = root->left;
            free(root);
            return temp;
        }

        struct node *temp = findMin(root->right);

        root->data = temp->data;

        root->right = deleteNode(root->right, temp->data);
    }

    return root;
}

/* Inorder Traversal */
void inorder(struct node *root)
{

    if (root != NULL)
    {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

/* Main Menu */
int main()
{

    struct node *root = NULL;
    int choice, val;

    while (1)
    {

        printf("------ Binary Search Tree Menu ------\n");
        printf("1. Insert\n");
        printf("2. Search\n");
        printf("3. Delete\n");
        printf("4. Display (Inorder)\n");
        printf("5. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        switch(choice) {
        case 1:
            printf("Enter value to insert: ");
            scanf("%d", &val);
            root = insert(root, val);
            break;

        case 2:
            printf("Enter value to search: ");
            scanf("%d", &val);

            if (search(root, val))
                printf("Element found");
            else
                    printf("Element not found");

                break;

            case 3:
                printf("Enter value to delete: ");
                scanf("%d", &val);
                root = deleteNode(root, val);
                break;

            case 4:
                printf("BST Inorder Traversal: ");
                inorder(root);
                printf(" ");
                break;

            case 5:
                exit(0);

            default:
                printf("Invalid choice");
        }
    }
}
`);
});

/* Bubble Sort */
app.get("/bbs", (req, res) => {
  res.send(`
#include<stdio.h>

int main(){
    int n,i,j,temp;

    printf("Enter number of elements: ");
    scanf("%d",&n);

    int a[n];

    printf("Enter elements:\n");
    for(i=0;i<n;i++){
        scanf("%d",&a[i]);
    }

    for(i=0;i<n-1;i++){
        for(j=0;j<n-i-1;j++){
            if(a[j]>a[j+1]){
                temp=a[j];
                a[j]=a[j+1];
                a[j+1]=temp;
            }
        }
    }

    printf("Sorted array:\n");
    for(i=0;i<n;i++)
        printf("%d ",a[i]);

    return 0;
}
`);});

/* Selection Sort */
app.get("/ss", (req, res) => {
  res.send(`
#include<stdio.h>

int main(){
    int n,i,j,min,temp;

    printf("Enter number of elements: ");
    scanf("%d",&n);

    int a[n];

    printf("Enter elements:\n");
    for(i=0;i<n;i++){
        scanf("%d",&a[i]);
    }

    for(i=0;i<n-1;i++){
        min=i;

        for(j=i+1;j<n;j++){
            if(a[j]<a[min])
                min=j;
        }

        temp=a[i];
        a[i]=a[min];
        a[min]=temp;
    }

    printf("Sorted array:\n");

    for(i=0;i<n;i++)
        printf("%d ",a[i]);

    return 0;
}
`);});

/* Insertion Sort */
app.get("/is", (req, res) => {
  res.send(`
#include<stdio.h>

int main(){
    int n,i,j,key;

    printf("Enter number of elements: ");
    scanf("%d",&n);

    int a[n];

    printf("Enter elements:\n");
    for(i=0;i<n;i++){
        scanf("%d",&a[i]);
    }

    for(i=1;i<n;i++){
        key=a[i];
        j=i-1;

        while(j>=0 && a[j]>key){
            a[j+1]=a[j];
            j--;
        }

        a[j+1]=key;
    }

    printf("Sorted array:\n");

    for(i=0;i<n;i++)
        printf("%d ",a[i]);

    return 0;
}
`);});

/* Merge Sort */
app.get("/ms", (req, res) => {
  res.send(`
#include<stdio.h>

void merge(int a[],int l,int m,int r){
    int i=l,j=m+1,k=0,temp[100];

    while(i<=m && j<=r){
        if(a[i]<a[j])
            temp[k++]=a[i++];
        else
            temp[k++]=a[j++];
    }

    while(i<=m)
        temp[k++]=a[i++];

    while(j<=r)
        temp[k++]=a[j++];

    for(i=l,j=0;i<=r;i++,j++)
        a[i]=temp[j];
}

void mergesort(int a[],int l,int r){
    int m;

    if(l<r){
        m=(l+r)/2;

        mergesort(a,l,m);
        mergesort(a,m+1,r);

        merge(a,l,m,r);
    }
}

int main(){
    int n,i,a[100];

    printf("Enter number of elements: ");
    scanf("%d",&n);

    printf("Enter elements:\n");
    for(i=0;i<n;i++)
        scanf("%d",&a[i]);

    mergesort(a,0,n-1);

    printf("Sorted array:\n");

    for(i=0;i<n;i++)
        printf("%d ",a[i]);

    return 0;
}
`);});

/* Quick Sort */
app.get("/qs", (req, res) => {
  res.send(`
#include<stdio.h>

int partition(int a[],int low,int high){
    int pivot=a[low];
    int i=low+1;
    int j=high;
    int temp;

    while(i<=j){

        while(a[i]<=pivot && i<=high)
            i++;

        while(a[j]>pivot)
            j--;

        if(i<j){
            temp=a[i];
            a[i]=a[j];
            a[j]=temp;
        }
    }

    temp=a[low];
    a[low]=a[j];
    a[j]=temp;

    return j;
}

void quicksort(int a[],int low,int high){
    int p;

    if(low<high){
        p=partition(a,low,high);

        quicksort(a,low,p-1);
        quicksort(a,p+1,high);
    }
}

int main(){
    int n,i,a[100];

    printf("Enter number of elements: ");
    scanf("%d",&n);

    printf("Enter elements:\n");
    for(i=0;i<n;i++)
        scanf("%d",&a[i]);

    quicksort(a,0,n-1);

    printf("Sorted array:\n");

    for(i=0;i<n;i++)
        printf("%d ",a[i]);

    return 0;
}
`);});

/* Linear Search */
app.get("/ls", (req, res) => {
  res.send(`
#include<stdio.h>

int main(){
    int n,i,key,flag=0;

    printf("Enter number of elements: ");
    scanf("%d",&n);

    int a[n];

    printf("Enter elements:\n");
    for(i=0;i<n;i++){
        scanf("%d",&a[i]);
    }

    printf("Enter element to search: ");
    scanf("%d",&key);

    for(i=0;i<n;i++){
        if(a[i]==key){
            flag=1;
            break;
        }
    }

    if(flag==1)
        printf("Element found at position %d",i+1);
    else
        printf("Element not found");

    return 0;
}
`);});

/* Binary Search */
app.get("/bis", (req, res) => {
  res.send(`
#include<stdio.h>

int main(){
    int n,i,key,low=0,high,mid;

    printf("Enter number of elements: ");
    scanf("%d",&n);

    int a[n];

    printf("Enter sorted elements:\n");
    for(i=0;i<n;i++){
        scanf("%d",&a[i]);
    }

    printf("Enter element to search: ");
    scanf("%d",&key);

    high=n-1;

    while(low<=high){
        mid=(low+high)/2;

        if(a[mid]==key){
            printf("Element found at position %d",mid+1);
            return 0;
        }
        else if(a[mid]<key)
            low=mid+1;
        else
            high=mid-1;
    }

    printf("Element not found");

    return 0;
}`);});

/* Hashing */
app.get("/hash", (req, res) => {
  res.send(`
#include<stdio.h>

int main(){
    int n,i,key;
    int table[10];

    for(i=0;i<10;i++)
        table[i]=-1;

    printf("Enter number of elements: ");
    scanf("%d",&n);

    printf("Enter elements:\n");

    for(i=0;i<n;i++){
        scanf("%d",&key);

        int index=key%10;

        table[index]=key;
    }

    printf("Hash Table:\n");

    for(i=0;i<10;i++){
        if(table[i]!=-1)
            printf("%d -> %d\n",i,table[i]);
        else
            printf("%d -> Empty\n",i);
    }

    return 0;
}
`);});

app.listen(PORT, () => {
  console.log("DSA API running on port " + PORT);
});
