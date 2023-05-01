import sys;

def add(a, b):
    return a + b

if __name__ == "__main__":
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    result = int(sys.argv[2])
    print(add(a, b) == result)