namespace SpriteKind {
    export const Blaster = SpriteKind.create()
    export const ShopGuy = SpriteKind.create()
    export const Player_Projectile = SpriteKind.create()
    export const HammerStrike = SpriteKind.create()
    export const SwordSlash = SpriteKind.create()
    export const TestEnemy = SpriteKind.create()
    export const TestEnemy2 = SpriteKind.create()
    export const Block = SpriteKind.create()
}
namespace StatusBarKind {
    export const TestHP = StatusBarKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Also Level 3`)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    game.showLongText("You got the Phantom bow!        You have infinite arrows!", DialogLayout.Top)
    Got_Bow = true
    if (game.ask("Equip now? ")) {
        Has_Bow = true
    } else {
        game.showLongText("Alright then.", DialogLayout.Top)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Ghost.isHittingTile(CollisionDirection.Bottom)) {
        Ghost.vy = -300
        Jump = true
        Jump_Direction()
    } else if (Jump == true) {
        Ghost.vy = -285
        Jump = false
        Jump_Direction()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TestEnemy2, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(Ghost, assets.tile`Start`)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Look_Cute = true
    if (Facing_Left == true) {
        animation.runImageAnimation(
        Ghost,
        assets.animation`Cute Left`,
        200,
        true
        )
    } else {
        animation.runImageAnimation(
        Ghost,
        assets.animation`Cute Right`,
        200,
        true
        )
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Next0`, function (sprite, location) {
    info.setLife(3)
    scene.setBackgroundImage(assets.image`Gray`)
    tiles.setCurrentTilemap(tilemap`Level 3`)
    tiles.placeOnRandomTile(Ghost, assets.tile`Start`)
    Cannon_U.setFlag(SpriteFlag.Invisible, true)
    Cannon_D.setFlag(SpriteFlag.Invisible, true)
    Cannon_L.setFlag(SpriteFlag.Invisible, true)
    Cannon_R.setFlag(SpriteFlag.Invisible, true)
    Canon_Active = false
    Standard_Enemy = sprites.create(assets.image`Normal Enemy`, SpriteKind.TestEnemy2)
    Standard_Enemy.follow(Ghost, 10)
    statusbar = statusbars.create(20, 3, StatusBarKind.TestHP)
    statusbar.max = 8
    statusbar.value = 8
    statusbar.attachToSprite(Standard_Enemy)
    statusbar.setColor(3, 15, 1)
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    tiles.placeOnTile(Standard_Enemy, tiles.getTileLocation(53, 9))
    characterAnimations.loopFrames(
    Standard_Enemy,
    assets.animation`Animate Enemy Left`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Standard_Enemy,
    assets.animation`Sily MC Right`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Finish`, function (sprite, location) {
    NextLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Look_Cute = false
    if (Has_Bow == true) {
        if (Facing_Left == true) {
            animation.runImageAnimation(
            Ghost,
            assets.animation`Bow Left`,
            200,
            false
            )
            timer.after(400, function () {
                Arrow = sprites.createProjectileFromSprite(assets.image`Arrow Left`, Ghost, -150, 2)
                Arrow.setKind(SpriteKind.Player_Projectile)
            })
        } else {
            animation.runImageAnimation(
            Ghost,
            assets.animation`Bow Right`,
            200,
            false
            )
            timer.after(400, function () {
                Arrow = sprites.createProjectileFromSprite(assets.image`Arrow Right`, Ghost, 150, 2)
                Arrow.setKind(SpriteKind.Player_Projectile)
            })
        }
    } else if (Has_Hammer == true) {
        if (Ghost.isHittingTile(CollisionDirection.Bottom)) {
            if (Facing_Left == true) {
                animation.runImageAnimation(
                Ghost,
                assets.animation`Hammer Left`,
                200,
                false
                )
                timer.after(400, function () {
                    Ghost.setKind(SpriteKind.HammerStrike)
                    timer.after(680, function () {
                        Ghost.setKind(SpriteKind.Player)
                    })
                })
            } else {
                animation.runImageAnimation(
                Ghost,
                assets.animation`Hammer Right`,
                200,
                false
                )
                timer.after(400, function () {
                    Ghost.setKind(SpriteKind.HammerStrike)
                    timer.after(680, function () {
                        Ghost.setKind(SpriteKind.Player)
                    })
                })
            }
        }
    } else if (Has_Sword == true) {
        if (Facing_Left == true) {
            animation.runImageAnimation(
            Ghost,
            assets.animation`Sword Left`,
            200,
            false
            )
            timer.after(200, function () {
                Ghost.setKind(SpriteKind.SwordSlash)
                timer.after(520, function () {
                    Ghost.setKind(SpriteKind.Player)
                })
            })
        } else {
            animation.runImageAnimation(
            Ghost,
            assets.animation`Sword Right`,
            200,
            false
            )
            timer.after(200, function () {
                Ghost.setKind(SpriteKind.SwordSlash)
                timer.after(520, function () {
                    Ghost.setKind(SpriteKind.Player)
                })
            })
        }
    }
})
statusbars.onZero(StatusBarKind.TestHP, function (status) {
    sprites.destroy(Standard_Enemy, effects.disintegrate, 500)
    info.changeScoreBy(10)
    tiles.setCurrentTilemap(tilemap`also Level 3`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Ghost,
    assets.animation`Animate Left`,
    200,
    true
    )
    Facing_Left = true
    Look_Cute = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TestEnemy, function (sprite, otherSprite) {
    if (Look_Cute == true) {
        sprites.destroy(otherSprite, effects.confetti, 500)
        info.changeScoreBy(5)
    } else if (Ground_Pound == true) {
        sprites.destroy(otherSprite, effects.disintegrate, 500)
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
        tiles.placeOnRandomTile(Ghost, assets.tile`Start`)
    }
})
sprites.onOverlap(SpriteKind.Player_Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 200)
})
sprites.onOverlap(SpriteKind.HammerStrike, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Ghost,
    assets.animation`Animate Right`,
    200,
    true
    )
    Facing_Left = false
    Look_Cute = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
})
function Jump_Direction () {
    if (Facing_Left == true) {
        animation.runImageAnimation(
        Ghost,
        assets.animation`Jump Left`,
        200,
        false
        )
    } else {
        animation.runImageAnimation(
        Ghost,
        assets.animation`Jump Right`,
        200,
        false
        )
    }
}
function NextLevel () {
    Level += 1
    if (Level == 1) {
        info.setLife(3)
        tiles.setCurrentTilemap(tilemap`Level 2`)
        tiles.placeOnTile(Ghost, tiles.getTileLocation(1, 34))
        tiles.placeOnTile(Cannon_U, tiles.getTileLocation(14, 33))
        tiles.placeOnTile(Cannon_D, tiles.getTileLocation(14, 35))
        tiles.placeOnTile(Cannon_L, tiles.getTileLocation(13, 34))
        tiles.placeOnTile(Cannon_R, tiles.getTileLocation(15, 34))
        tiles.placeOnTile(Test_Enemy, tiles.getTileLocation(6, 19))
        Test_Enemy.setFlag(SpriteFlag.Invisible, false)
        Test_Enemy.setFlag(SpriteFlag.GhostThroughSprites, false)
        Test_Enemy.follow(Ghost, 7)
    } else if (Level == 2) {
        info.setLife(3)
    } else {
        game.setGameOverEffect(true, effects.confetti)
        game.setGameOverScoringType(game.ScoringType.None)
        game.gameOver(true)
    }
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Ground_Pound == true) {
        Ghost.vy = 700
        Ground_Pound = false
        if (Ghost.isHittingTile(CollisionDirection.Bottom)) {
            Ground_Pound = false
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Ghost.isHittingTile(CollisionDirection.Bottom)) {
    	
    } else {
        Ground_Pound = true
        animation.runImageAnimation(
        Ghost,
        assets.animation`Ground Pound`,
        200,
        true
        )
    }
})
sprites.onOverlap(SpriteKind.Player_Projectile, SpriteKind.TestEnemy2, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbar.value += -3
    Standard_Enemy.follow(Ghost, 20)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Got_Bow == true) {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Bow", assets.image`Bow`)
        )
        myMenu.setFlag(SpriteFlag.StayInScreen, true)
        myMenu.setDimensions(100, 100)
        myMenu.setTitle("Weapons")
        myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                Has_Bow = true
                myMenu.close()
            }
        })
    } else if (Got_Hammer == true) {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Bow", assets.image`Bow`),
        miniMenu.createMenuItem("Hammer", assets.image`Hammer`)
        )
        myMenu.setFlag(SpriteFlag.StayInScreen, true)
        myMenu.setDimensions(100, 100)
        myMenu.setTitle("Weapons")
        myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                Has_Bow = true
                Has_Hammer = false
                myMenu.close()
            } else if (selectedIndex == 1) {
                Has_Hammer = true
                Has_Bow = false
                myMenu.close()
            }
        })
    } else if (Got_Sword == true) {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Bow", assets.image`Bow`),
        miniMenu.createMenuItem("Hammer", assets.image`Hammer`),
        miniMenu.createMenuItem("Sword", assets.image`Sword`)
        )
        myMenu.setFlag(SpriteFlag.StayInScreen, true)
        myMenu.setDimensions(100, 100)
        myMenu.setTitle("Weapons")
        myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                Has_Bow = true
                Has_Hammer = false
                Has_Sword = false
                myMenu.close()
            } else if (selectedIndex == 1) {
                Has_Hammer = true
                Has_Bow = false
                Has_Sword = false
                myMenu.close()
            } else if (selectedIndex == 2) {
                Has_Sword = true
                Has_Bow = false
                Has_Hammer = false
                myMenu.close()
            }
        })
    } else {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Nothing", assets.image`Nothing`)
        )
        myMenu.setFlag(SpriteFlag.StayInScreen, true)
        myMenu.setDimensions(100, 100)
        myMenu.setTitle("Weapons")
        myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            myMenu.close()
        })
    }
    myMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
        myMenu.close()
    })
})
info.onLifeZero(function () {
    music.stopAllSounds()
    game.setGameOverPlayable(false, music.createSong(assets.song`Game Over`), false)
    game.setGameOverEffect(false, effects.splatter)
    game.gameOver(false)
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Block)
})
sprites.onOverlap(SpriteKind.SwordSlash, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
let cannon_projectile: Sprite = null
let myMenu: miniMenu.MenuSprite = null
let Level = 0
let Arrow: Sprite = null
let statusbar: StatusBarSprite = null
let Standard_Enemy: Sprite = null
let Cannon_R: Sprite = null
let Cannon_L: Sprite = null
let Cannon_D: Sprite = null
let Cannon_U: Sprite = null
let Canon_Active = false
let Look_Cute = false
let Ground_Pound = false
let Jump = false
let Facing_Left = false
let Got_Sword = false
let Got_Hammer = false
let Got_Bow = false
let Has_Hammer = false
let Has_Sword = false
let Has_Bow = false
let Test_Enemy: Sprite = null
let Ghost: Sprite = null
scene.setBackgroundImage(assets.image`Blue`)
game.showLongText("PHANTOMS                 A Collaboration Platformer", DialogLayout.Full)
game.showLongText("By Cursedeclipse, pecan4, Josef, CopySprite, TeddyB, Luke, JtSpeedRun, HaruhitoGames, Not-a-creepy-doll and InvalidProject", DialogLayout.Full)
scene.setBackgroundImage(assets.image`Purple`)
tiles.setCurrentTilemap(tilemap`level 1`)
Ghost = sprites.create(assets.image`Foargond`, SpriteKind.Player)
let ShopKeeper = sprites.create(assets.image`ShopKeeper`, SpriteKind.ShopGuy)
Test_Enemy = sprites.create(assets.image`TestEnemy`, SpriteKind.TestEnemy)
tiles.placeOnRandomTile(Ghost, assets.tile`Start`)
scene.cameraFollowSprite(Ghost)
Has_Bow = false
Has_Sword = false
Has_Hammer = false
Got_Bow = false
Got_Hammer = false
Got_Sword = false
Facing_Left = false
Jump = false
Ground_Pound = false
Look_Cute = false
Canon_Active = true
Ghost.ay = 450
ShopKeeper.setFlag(SpriteFlag.Invisible, true)
Test_Enemy.setFlag(SpriteFlag.Invisible, true)
Test_Enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
Ghost.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(Ghost, 100, 0)
profilelife.setMaxLife(3)
info.setLife(3)
profilelife.setFilledLifeImage(assets.image`Health`)
profilelife.setEmptyLifeImage(assets.image`HP lost`)
music.setVolume(80)
music.play(music.createSong(assets.song`Grave Mistake`), music.PlaybackMode.LoopingInBackground)
animation.runImageAnimation(
ShopKeeper,
assets.animation`ShopMan`,
500,
true
)
Cannon_U = sprites.create(assets.image`cannonup`, SpriteKind.Blaster)
tiles.placeOnTile(Cannon_U, tiles.getTileLocation(14, 3))
Cannon_D = sprites.create(assets.image`cannondown`, SpriteKind.Blaster)
tiles.placeOnTile(Cannon_D, tiles.getTileLocation(14, 5))
Cannon_L = sprites.create(assets.image`cannonleft`, SpriteKind.Blaster)
tiles.placeOnTile(Cannon_L, tiles.getTileLocation(13, 4))
Cannon_R = sprites.create(assets.image`cannonright`, SpriteKind.Blaster)
tiles.placeOnTile(Cannon_R, tiles.getTileLocation(15, 4))
characterAnimations.loopFrames(
Test_Enemy,
assets.animation`Animate TestEnemy Left`,
200,
characterAnimations.rule(Predicate.MovingLeft)
)
characterAnimations.loopFrames(
Test_Enemy,
assets.animation`Animate TestEnemy Right`,
200,
characterAnimations.rule(Predicate.MovingRight)
)
game.onUpdateInterval(2000, function () {
    if (Canon_Active == true) {
        cannon_projectile = sprites.createProjectileFromSprite(assets.image`Fire Up`, Cannon_U, 0, -100)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        cannon_projectile = sprites.createProjectileFromSprite(assets.image`Fire Down`, Cannon_D, 0, 100)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        cannon_projectile = sprites.createProjectileFromSprite(assets.image`Fire Left`, Cannon_L, -100, 0)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        cannon_projectile = sprites.createProjectileFromSprite(assets.image`Fire Right`, Cannon_R, 100, 0)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    }
})
