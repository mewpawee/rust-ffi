from ctypes import cdll, c_int

# Load the shared library. Adjust the path as necessary.
lib = cdll.LoadLibrary("target/release/liblib.dylib")

# Set the argument and return types
lib.add_numbers.argtypes = (c_int, c_int)
lib.add_numbers.restype = c_int

# Call the Rust function
result = lib.add_numbers(5, 7)
print(f"The result is: {result}")
