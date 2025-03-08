import os


def getenv(name: str, default: str = None) -> str:
    """
    Retrieves the value of an environment variable. It's possible to provide a fallback value in case the variable is
    not set. If no default value is provided and the variable is not set, a ValueError will be raised.

    Args:
        name (str): The name of the environment variable to retrieve.
        default (str, optional): The fallback value to use if the variable is not set. Defaults to None.
    Returns:
        str: The value of the environment variable.
    Raises:
        ValueError: If the variable is not set and no default value is provided.
    """
    if name not in os.environ:
        if default is None:
            raise ValueError(f"Missing required environment variable: {name}")
        os.environ[name] = default
    return os.environ[name]
