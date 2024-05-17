from google.cloud import logging


def write_entry(logger_name, entry):
    """Writes log entries to the given logger."""
    logging_client = logging.Client()

    # This log can be found in the Cloud Logging console under 'Custom Logs'.
    logger = logging_client.logger(logger_name)

    # Struct log. The struct can be any JSON-serializable dictionary.
    logger.log_struct(
        entry,
        severity="INFO",
    )


def list_entries(logger_name):
    """Lists the most recent entries for a given logger."""
    logging_client = logging.Client()
    logger = logging_client.logger(logger_name)

    print("Listing entries for logger {}:".format(logger.name))

    for entry in logger.list_entries():
        timestamp = entry.timestamp.isoformat()
        print("* {}: {}".format(timestamp, entry.payload))


def delete_logger(logger_name):
    """Deletes a logger and all its entries.

    Note that a deletion can take several minutes to take effect.
    """
    logging_client = logging.Client()
    logger = logging_client.logger(logger_name)

    logger.delete()
