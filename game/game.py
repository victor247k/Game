import pygame


pygame.init()

screen = pygame.display.set_mode ((800, 600))

pygame.display.set_caption("My super cool game")
icon = pygame.image.load('ufo.png')
pygame.display.set_icon(icon)

playerImg = pygame.image.load('rocket.png')
playerImg = pygame.transform.scale(playerImg, (64, 64))
playerX  = 370
playerY = 480

def player(x, y):
    screen.blit(playerImg, (x, y))

playerX_change = 0
playerY_change = 0

running = True
while running:

    screen.fill((0, 0, 0))


    

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False


        if event.type == pygame.KEYDOWN:
         
            if event.key == pygame.K_LEFT:
                playerX_change = -.3
            if event.key == pygame.K_RIGHT:
                
                playerX_change = .3
        if event.type == pygame.KEYUP:
             if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                playerX_change = 0
               

    
    playerX += playerX_change

    if playerX <=0:
        playerX = 0
    elif playerX >=736:
        playerX = 736

    player(playerX,playerY)
    pygame.display.update()