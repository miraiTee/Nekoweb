import sys

from PyQt6.QtCore import *
from PyQt6.QtWidgets import *

import datetime as dt
import html
import md
import publish

# Subclass QMainWindow to customize your application's main window
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("My App")
        
        self.defineItems()
        self.defineLayout()
        
    def defineItems(self):    
        self.titlebox = QTextEdit()
        self.slugbox = QTextEdit()
        self.tagbox = QTextEdit()
        self.contentbox = QTextEdit()
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
        Widget = QWidget()
        Widget.setLayout(layout)
        self.setCentralWidget(Widget)
        
    def postdat(self):
        title = self.titlebox.toPlainText()
        tags = self.tagbox.toPlainText().split(", ")
        content = self.contentbox.toPlainText()
        slug = self.slugbox.toPlainText()
        
        now = dt.datetime.now()
        date = dt.date.strftime(now, "%B %d %y")
    
        html.buildPost(md.build(title, slug, date, tags, content))
        html.buildSection()
        publish.github()
        self.close()
        
app = QApplication(sys.argv)

window = MainWindow()

window.show()

app.exec()
