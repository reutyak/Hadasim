from shape import Shape


class Rectangle(Shape):
    height = 0
    width = 0

    def __init__(self, height, width):
        Shape.__init__(self, height, width)

    def circumference(self) -> float:
        return (self.height + self.width)*2

    # def check_square(self) -> bool:
    #     if self.height == self.width:
    #         return True
    #     else:
    #         return False
    #
    # def difference_gt_5(self) -> bool:
    #     difference = abs(self.height - self.width)
    #     if difference > 5:
    #         return True
    #     else:
    #         return False

    def test(self) -> bool:
        if self.height == self.width or abs(self.height - self.width) > 5:
            return True
        else:
            return False

    def area_rectangle(self) -> float:
        return self.width * self.height

    def check_print(self):
        if self.test():
            print("The area of the rectangle is: " + str(self.area_rectangle()))
        else:
            print("The circumference of the rectangle is: " + str(self.circumference()))


