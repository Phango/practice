""" The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ?
"""
def primes(upto):
    multiples = []
    primes = []
    for i in range(2, upto+1):
        if i not in multiples:
            primes.append(i)
            for j in range(i*i, upto+1, i):
                multiples.append(j)
    return primes

primes = primes(10000)

def largest_prime_factor(number):
    factor = []

    for k in range(len(primes)):
        if number % primes[k] == 0:
            factor.append(primes[k])
    
    return max(factor)

#print largest_prime_factor(13195)
#print primes
print largest_prime_factor(600851475143)
