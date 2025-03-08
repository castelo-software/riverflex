def singleton(class_):
    """
    Decorator that converts a class into a singleton class. This will ensure that creating a new instance of the class
    will always return the same instance.
    """
    instances = {}

    def getinstance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]

    return getinstance
