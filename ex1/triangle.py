import math
from shape import Shape


class Triangle(Shape):
    def __init__(self, height, width):
        Shape.__init__(self, height, width)

    def __calc_side(self) -> float:
        return ((0.5 * self.width)**2 + self.height**2)**0.5

    def circumference(self) -> float:
        my_circumference: float = (2*self.__calc_side())+self.width
        return my_circumference

    def test(self) -> bool:
        if self.width % 2 == 0 or self.width > 2*self.height:
            return True
        else:
            return False

    def __print_triangle_point(self):
        num_odd_lte_width = math.ceil(self.width / 2)
        num_prints_inner_lines = math.floor((self.height-2)/(num_odd_lte_width-2))
        plus3 = (self.height-2) % (num_odd_lte_width-2)
        space_one = int((self.width - 1) / 2) * " "
        space_three = int((self.width - 3) / 2) * " "
        print("{}*{}".format(space_one, space_one))
        for j in range(plus3):
            print("{}***{}".format(space_three, space_three))
        i = 3
        while i < self.width:
            space = int((self.width - i) / 2)
            start_end = space * " "
            middle = i * "*"
            for j in range(num_prints_inner_lines):
                print("{}{}{}".format(start_end, middle, start_end))
            i += 2
        print(self.width * "*")

    def print_me(self):
        if self.test():
            print("Sorry, this triangle can't be printed")
        else:
            self.__print_triangle_point()


