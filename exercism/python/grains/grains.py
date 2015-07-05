CHESS_SERIES = [2**square for square in range(65)]

def on_square(square):
    return CHESS_SERIES[square-1]


def total_after(square):
    return sum(CHESS_SERIES[:square])
