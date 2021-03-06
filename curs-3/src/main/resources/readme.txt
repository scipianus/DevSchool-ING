- Java 8
    - lambdas
    - streams
=======================
Lambdas
    - Lambda expressions - easier way to write anonymous classes
    - Lambda - functional interface - interface with only one abstract method - @FunctionalInterface
    - Type of a lambda - functional interface
    - Creating a new object is NOT FREE: get memory, clean the memory, execute static initializer, execute static blocks, non-static initializer, non-static blocks, ...
    - With lambdas - you do not create an object, you do not call new
    - java.util.function - rich set of functional interfaces (~43)
    - 4 categories of functional interfaces:
        - Supplier
            - does not take any parameter and provides a new object
        - Consumer
            - expects an object and does not return anything
            - BiConsumer - takes two parameters
        - Predicate
            - takes a parameter and returns a boolean
            - BiPredicate - takes two parameters
        - Function
            - takes an object as parameter and returns another object
            - BiFunction as well
            - UnaryOperator - takes an object and returns an object of the same type
            - BinaryOperator - takes two objects of the same type and returns an object of the same type
========================
Collectors and Stream API
    - Stream<Person> personStream = persons.stream();
    - Stream = typed interface
    - Stream != Collection
    - provides a way to process large amounts of data
    - streams do not contain any data
    - operations that can be applied:
        - intermediary
        - final - may be called only once
    - map / filter / reduce:
        - map
            - uses Function
            - takes a list of A and returns a list of B
            - the size of both lists is the same
            - changes the type
        - filter
            - uses Predicate
            - takes a list of A and returns a list of A
            - does not change the type
            - but it changes the size of the list
        - reduce
            - final operation
            - equivalent to an SQL aggregation
            - they are of two types:
                - basic: SQL operation - min, max, sum, average
                - collectors:
