from rectangle import Rectangle
from triangle import Triangle

while True:
    user_input = -1
    while user_input != 3:
        print(
            "Welcome, please make your choice and press Enter: \n1)Rectangle Tower\n2)Triangular Tower\n3)Exit")
        try:
            user_input = int(input())
        except ValueError:
            print("Wrong tapping, try again")
            continue
        if 1 <= user_input <= 3:
            break
        else:
            print("Wrong tapping, try again")
            continue
    if user_input == 3:
        break
    elif user_input == 1 or user_input == 2:
        while True:
            try:
                tower_height = int(input("Set the height of the desired tower greater than or equal to 2"))
                tower_width = int(input("Set the width of the desired tower"))
                if tower_height < 2:
                    print("The height of the tower must be greater than or equal to 2")
                    continue
                elif tower_width <= 0:
                    print("The width of the tower must be greater 0")
                    continue
                if user_input == 1:
                    my_rectangle = Rectangle(tower_height, tower_width)
                    my_rectangle.check_print()
                    break
                elif user_input == 2:
                    my_triangle = Triangle(tower_height, tower_width)
                    user_input_t = -1
                    while True:
                        while user_input_t != (1 or 2):
                            print(
                                "What do you want to do, please make your choice and press Enter:"
                                " \n1)Calculate the circumference of the triangle\n2)Print the triangle")
                            try:
                                user_input_t = int(input())
                            except ValueError:
                                print("Wrong tapping, try again")
                                continue
                            if 1 <= user_input_t <= 2:
                                break
                            else:
                                print("Wrong tapping, try again")
                                continue
                        if user_input_t == 1:
                            print("The triangle's circumference is: " + str(my_triangle.circumference()))
                            break
                        elif user_input_t == 2:
                            my_triangle.print_me()
                            break
                    break
            except ValueError:
                print("At least one of the entered values is incorrect, try again")
                continue



