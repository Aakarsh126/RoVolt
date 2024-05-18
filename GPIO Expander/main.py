import machine

#Status LED
led_builtin = machine.Pin("LED", machine.Pin.OUT)
led_builtin.value(1)

# Initialize UART
uart = machine.UART(1, baudrate=9600, tx=machine.Pin(4), rx=machine.Pin(5))

# Dictionary to hold the pin objects
pins = {}

# Function to initialize a pin if not already done
def init_pin(pin_number):
    if pin_number not in pins:
        pins[pin_number] = machine.Pin(pin_number, machine.Pin.OUT)

# Define a function to set a GPIO pin
def set_pin(pin_number, value):
    init_pin(pin_number)
    pins[pin_number].value(value)

# Main loop
while True:
    command = uart.read(2)
    if command:
        try:
            # Parse the command
            pin_number, value = command
            # Set the GPIO pin
            set_pin(pin_number, value)
        except ValueError:
            # Handle invalid command
            print("Invalid command")