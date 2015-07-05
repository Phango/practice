;Each new term in the Fibonacci sequence is generated by adding the previous
;two terms. By starting with 1 and 2, the first 10 terms will be:
;1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
;By considering the terms in the Fibonacci sequence whose values do not exceed
;four million, find the sum of the even-valued terms.

(defn sum
  [a b]
  (+ a b))

(defn second-to-last
  [coll]
  (second (reverse coll)))

(defn add-next-fib
  [coll]
  (conj coll (sum (second-to-last coll) (last coll))))

(def fib [1 2])

(while (> 4000000 (last fib))
       (def fib (add-next-fib fib)))

(defn is-even
  [number]
  (= 0 (mod number 2)))

(reduce + (filter is-even fib))

