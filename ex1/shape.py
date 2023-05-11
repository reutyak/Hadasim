from abc import ABC, abstractmethod


class Shape(ABC):
    def __init__(self, height, width):
        self.height = height
        self.width = width

    @abstractmethod
    def circumference(self) -> float:
        pass

    @abstractmethod
    def test(self) -> bool:
        pass


