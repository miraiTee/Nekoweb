import sys

from PyQt6.QtCore import *
from PyQt6.QtWidgets import *

import datetime as dt
import html
import md
import publish

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Templater")

        self.defineItems()
        self.defineLayout()

        width = 800
        height = 600

        self.resize(width, height)

    def defineItems(self):
        self.titlebox = QTextEdit("Title")
        self.titlebox.setFixedHeight(40)
        self.slugbox = QTextEdit("Slug")
        self.slugbox.setFixedHeight(40)

        self.tagbox = QTextEdit("Tags")
        self.tagbox.setFixedHeight(80)

        self.contentbox = QTextEdit()
        self.contentbox.setMinimumHeight(300)

        self.postbutton = QPushButton("POST")
        self.postbutton.setCheckable(True)
        self.postbutton.clicked.connect(self.postdat)

    def defineLayout(self):
        layout = QVBoxLayout()

        layout.addWidget(self.titlebox)
        layout.addWidget(self.slugbox)
        layout.addWidget(self.tagbox)
        layout.addWidget(self.contentbox)
        layout.addWidget(self.postbutton)

        central_widget = QWidget()
        central_widget.setLayout(layout)

        self.setCentralWidget(central_widget)

    def postdat(self):
        title = self.titlebox.toPlainText()
        tags = self.tagbox.toPlainText().split(", ")
        content = self.contentbox.toPlainText()
        slug = self.slugbox.toPlainText()

        now = dt.datetime.now()
        date = now.strftime("%B %d %y")

        html.buildPost(md.build(title, slug, date, tags, content))
        html.buildSection()
        publish.github()

        self.close()
      
app = QApplication(sys.argv)

window = MainWindow()
window.show()

sys.exit(app.exec())