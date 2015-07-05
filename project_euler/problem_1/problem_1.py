def sum_in_range(a, b, numberRange):
    """Returns the sums of a and b within the numberRange

    a: a number
    b: a number different to a
    numberRange: the range which the numbers a and b should go up to
    """
    try:
        a = int(a)
        b = int(b)
        numberRange = int(numberRange)
    except ValueError:
        return "Please enter a valid number for 'sum_in_range(a, b, numberRange)'."
    
    sum_a = 0
    sum_b = 0
    
    for i in range(a, numberRange, a):
        if i % b == 0:  # to avoid adding a number twice,
                        # this line skips numbers which will are multiples of a and b
            continue
        else:
            sum_a += i

    for j in range(b, numberRange, b):
        sum_b += j

    return sum_a + sum_b

if __name__ == "__main__":
    print(sum_in_range(3, 5, 1000))
    print(sum_in_range("s", 5, 1000))
    print(sum_in_range(3, "u", 1000))
    print(sum_in_range(3, 5, "f"))
