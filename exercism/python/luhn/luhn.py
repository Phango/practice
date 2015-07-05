class Luhn():
    def __init__(self, number):
        self.number = str(number)


    def addends(self):
        luhn = ""
        for i in range(-1,len(self.number)*-1, -1):
            if self.number[i] % 2 == 0:
                luhn += str(int(i) * 2)
            else:
                luhn += i
        return luhn
    
