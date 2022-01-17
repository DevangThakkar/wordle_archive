import os
import selenium
from time import sleep

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

path = "/home/devang/Downloads/Wordle/chromedriver"
driver = webdriver.Chrome(path, options=Options().add_argument('ignore-certificate-errors'))

driver.get("https://www.powerlanguage.co.uk/wordle/")

sleep(3)

close_button = driver.execute_script("return document.querySelector('game-app').shadowRoot.querySelector('game-theme-manager').querySelector('#game').querySelector('game-modal').shadowRoot.querySelector('.close-icon')")
close_button.click()

for i in range(3):
	actions = ActionChains(driver)
	actions.send_keys('hello', Keys.RETURN).perform()
	sleep(3)
	actions.send_keys('world', Keys.RETURN).perform()
	sleep(3)

answer = driver.execute_script("return document.querySelector('game-app').shadowRoot.querySelector('game-theme-manager').querySelector('#game').querySelector('#game-toaster')")
print(answer.text)

driver.quit()