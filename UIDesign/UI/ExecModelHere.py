import sys
sys.path.append("E:/College/MiniProject/Mini-Project-group-8/Job") #C:/Users/akash/Documents/GitHub/Mini-Project-group-8/Job
                                                                            #E:/College/MiniProject/Mini-Project-group-8/Job
from PyQt5 import QtCore, QtGui, QtWidgets
from ModelCheck import predictor

class Ui_Dialog(object):
    def setupUi(self, Dialog):
        Dialog.setObjectName("Dialog")
        Dialog.resize(900, 650)
        Dialog.setStyleSheet("""
            background: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1,
            stop:0 #1e1e2e, stop:1 #2d2d44);
            color: white;
            font-family: 'Arial';
        """)
        
        self.label = QtWidgets.QLabel(Dialog)
        self.label.setGeometry(QtCore.QRect(20, 10, 400, 30))
        self.label.setText("Enter Your Sleep Data")
        self.label.setStyleSheet("font-size: 20px; font-weight: bold;")

        self.text_boxes = []
        self.labels = [
            "Enter your age (E.g. 21)",
            "Time you went to sleep (24h, e.g. 2200)",
            "Time you woke up (24h, e.g. 0600)",
            "No. of awakenings (e.g. 1)",
            "Caffeine Consumption (0 - 100)",
            "Alcohol Consumption (0 - 5)",
            "Do You Smoke? (Yes/No)",
            "Exercise Frequency (0 - 5)"
        ]

        y_pos = 50
        for i, text in enumerate(self.labels):
            label = QtWidgets.QLabel(Dialog)
            label.setGeometry(QtCore.QRect(20, y_pos, 400, 20))
            label.setText(text)
            label.setStyleSheet("font-size: 14px;")
            
            text_edit = QtWidgets.QTextEdit(Dialog)
            text_edit.setGeometry(QtCore.QRect(20, y_pos + 25, 200, 30))
            text_edit.setStyleSheet("background: #333; color: white; border-radius: 5px; font-size: 14px;")
            text_edit.textChanged.connect(self.save_text)
            self.text_boxes.append(text_edit)
            y_pos += 60
        
        self.textEdit_output = QtWidgets.QTextEdit(Dialog)
        self.textEdit_output.setGeometry(QtCore.QRect(650, 20, 200, 40))
        self.textEdit_output.setStyleSheet("background: #444; color: white; border-radius: 5px; font-size: 16px;")
        self.textEdit_output.setReadOnly(True)
        
        # self.textEdit.textChanged.connect(self.save_text)
        # self.textEdit_2.textChanged.connect(self.save_text)
        # self.textEdit_3.textChanged.connect(self.save_text)
        # self.textEdit_4.textChanged.connect(self.save_text)
        # self.textEdit_5.textChanged.connect(self.save_text)
        # self.textEdit_6.textChanged.connect(self.save_text)
        # self.textEdit_7.textChanged.connect(self.save_text)
        # self.textEdit_8.textChanged.connect(self.save_text)
        
        self.pushButton = QtWidgets.QPushButton(Dialog)
        self.pushButton.setGeometry(QtCore.QRect(650, 550, 100, 40))
        self.pushButton.setText("Predict")
        self.pushButton.setStyleSheet("background: #ff8c00; color: white; font-size: 16px; border-radius: 10px;")
        self.pushButton.clicked.connect(self.showPred)
        
        self.pushButton_2 = QtWidgets.QPushButton(Dialog)
        self.pushButton_2.setGeometry(QtCore.QRect(760, 550, 100, 40))
        self.pushButton_2.setText("Clear")
        self.pushButton_2.setStyleSheet("background: #dc3545; color: white; font-size: 16px; border-radius: 10px;")
        self.pushButton_2.clicked.connect(self.clearFields)
        
        QtCore.QMetaObject.connectSlotsByName(Dialog)
    def save_text(self):
        # text = self.textEdit.toPlainText()
        # text_2 = self.textEdit_2.toPlainText()
        # text_3 = self.textEdit_3.toPlainText()
        # text_4 = self.textEdit_4.toPlainText()
        # text_5 = self.textEdit_5.toPlainText()
        # text_6 = self.textEdit_6.toPlainText()
        # text_7 = self.textEdit_7.toPlainText()
        # text_8 = self.textEdit_8.toPlainText()
        text_total = []
        for i in self.text_boxes:
            text_total.append(i.toPlainText())
            text_total.append('\n')
        with open('E:/College/MiniProject/Mini-Project-group-8/Job/textFile.txt', 'w') as file:                     #C:/Users/akash/Documents/GitHub/Mini-Project-group-8/Job/textFile.txt
            file.writelines(text_total)                                                                                      #E:/College/MiniProject/Mini-Project-group-8/Job/textFile.txt

    def showPred(self):
        prediction = predictor()
        self.textEdit_output.setPlainText(f"Predicted Sleep Efficiency: {prediction[0]:.7f}")

    def clearFields(self):
        for text_box in self.text_boxes:
            text_box.clear()
        self.textEdit_output.clear()

if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    Dialog = QtWidgets.QDialog()
    ui = Ui_Dialog()
    ui.setupUi(Dialog)
    Dialog.show()
    sys.exit(app.exec_())
