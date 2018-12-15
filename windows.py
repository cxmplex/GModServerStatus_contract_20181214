import subprocess
import os
import datetime
import time


class WindowsInterface:
    def __init__(self):
        self.process_list = []

    def refresh_list(self):
        self.process_list = subprocess.check_output('tasklist', shell=True)

    def is_program_running(self, name) -> bool:
        print("is_program_running {}".format(name))
        self.refresh_list()
        if name.encode() in self.process_list:
            return True
        return False

    def start_program(self, path, name) -> bool:
        print("Starting application {} at {}".format(name, datetime.datetime.now()))
        os.startfile(path)
        time.sleep(3)
        if self.is_program_running(name):
            return True
        print("Starting application {} failed at {}".format(name, datetime.datetime.now()))
        return False
