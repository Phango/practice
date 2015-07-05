def largest_product(series, slice_size):
    slice_too_small = slice_size < 1
    if not series or slice_too_small:
        return 1
    product = lambda x,y: x*y
    sliced_series = slices(series, slice_size)
    return max([reduce(product, sliced_series[i]) for i in range(len(sliced_series))])

def slices(series, slice):
    slice_too_large = slice > len(series)
    slice_too_small = slice < 1
    if slice_too_small or slice_too_large:
        raise ValueError
    slices = []
    series_list = [int(number) for number in series]
    while len(series_list) >= slice:
        slices.append([series_list[number] for number in range(slice)])
        series_list = series_list[1:]
    return slices

