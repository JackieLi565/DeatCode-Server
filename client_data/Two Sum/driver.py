from result import add

TestCases = [[1, 2, 3], [2,3, 5], [4,5, 9]]
Result = [2, 5, 9]

if __name__ == "__main__":
    for i in TestCases:
        print(add(i[0], i[1]) == i[2])