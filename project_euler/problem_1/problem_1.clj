;If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
;Find the sum of all the multiples of 3 or 5 below 1000.

(reduce + 
        (set 
         (concat 
          (range 0 1000 3) (range 0 1000 5))))

(defn multiples-of
  "Returns the multiples of 'number', up to the limit of 'limit'"
  [number limit]
  (range number limit number))


(defn sum-of-seq
  "Returns the sum of a seq"
  [coll]
  (reduce + coll))


(defn sum-of-multiples-of
  [number limit]
  (sum-of-seq (multiples-of number limit)))


(defn answer1
  "Returns the answer to problem 1, by calculating the sum of multiples of 3, 5 and 15. Then summing the sums of 3 and 5 but taking away the sum of 15."
  []
  (- 
   (+ (sum-of-multiples-of 3 1000) (sum-of-multiples-of 5 1000))
   (sum-of-multiples-of 15 1000)))

      
