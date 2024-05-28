namespace SpriteKind {
    export const Null = SpriteKind.create()
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
function MakeEnemies (Level: number) {
    mySprite3 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
}
function MakeTilemap () {
    scene.setBackgroundImage(assets.image`Purple`)
    tiles.setCurrentTilemap(tilemap`level 1`)
    ShopKeeper = sprites.create(assets.image`ShopKeeper`, SpriteKind.ShopGuy)
    Test_Enemy = sprites.create(assets.image`TestEnemy`, SpriteKind.TestEnemy)
    tiles.placeOnRandomTile(PlayerSprite, assets.tile`Start`)
    ShopKeeper.setFlag(SpriteFlag.Invisible, true)
    Test_Enemy.setFlag(SpriteFlag.Invisible, true)
    Test_Enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
    Cannon_U = sprites.create(CannonShooterImg, SpriteKind.Blaster)
    tiles.placeOnTile(Cannon_U, tiles.getTileLocation(14, 3))
    Cannon_D = sprites.create(scaling.rot(CannonShooterImg, 180), SpriteKind.Blaster)
    tiles.placeOnTile(Cannon_D, tiles.getTileLocation(14, 5))
    Cannon_L = sprites.create(scaling.rot(CannonShooterImg, 270), SpriteKind.Blaster)
    tiles.placeOnTile(Cannon_L, tiles.getTileLocation(13, 4))
    Cannon_R = sprites.create(scaling.rot(CannonShooterImg, 90), SpriteKind.Blaster)
    tiles.placeOnTile(Cannon_R, tiles.getTileLocation(15, 4))
    animation.runImageAnimation(
    ShopKeeper,
    assets.animation`ShopMan`,
    200,
    true
    )
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.TestEnemy2, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(PlayerSprite, assets.tile`Start`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Next0`, function (sprite, location) {
    info.setLife(3)
    scene.setBackgroundImage(assets.image`Gray`)
    tiles.setCurrentTilemap(tilemap`Level 3`)
    tiles.placeOnRandomTile(PlayerSprite, assets.tile`Start`)
    Cannon_U.setFlag(SpriteFlag.Invisible, true)
    Cannon_D.setFlag(SpriteFlag.Invisible, true)
    Cannon_L.setFlag(SpriteFlag.Invisible, true)
    Cannon_R.setFlag(SpriteFlag.Invisible, true)
    Canon_Active = false
    Standard_Enemy = sprites.create(assets.image`Normal Enemy`, SpriteKind.TestEnemy2)
    Standard_Enemy.follow(PlayerSprite, 10)
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
function Effects () {
    myEffect = extraEffects.createCustomSpreadEffectData(
    [
    5,
    3,
    3,
    2
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(200, 400)
    )
}
function Destroy (mySprite: Sprite) {
    mySprite.setVelocity(0, 0)
    mySprite.setKind(SpriteKind.Null)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . f e 2 e . . . . . . 
        . . . . . . f e e e . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f . . f . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    false
    )
    timer.after(700, function () {
        sprites.destroy(mySprite)
    })
}
statusbars.onZero(StatusBarKind.TestHP, function (status) {
    sprites.destroy(Standard_Enemy, effects.disintegrate, 500)
    info.changeScoreBy(10)
    tiles.setCurrentTilemap(tilemap`also Level 3`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Facing_Left = true
    Look_Cute = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TestEnemy, function (sprite, otherSprite) {
    if (Look_Cute) {
        sprites.destroy(otherSprite, effects.confetti, 500)
        info.changeScoreBy(5)
    } else if (Ground_Pound) {
        sprites.destroy(otherSprite, effects.disintegrate, 500)
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
        tiles.placeOnRandomTile(PlayerSprite, assets.tile`Start`)
    }
})
sprites.onOverlap(SpriteKind.Player_Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 200)
})
function Music () {
    music.setVolume(80)
    music.play(music.createSong(assets.song`Grave Mistake`), music.PlaybackMode.LoopingInBackground)
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.follow(PlayerSprite, -10)
    sprites.setDataBoolean(sprite, "Shooting", true)
    sprite.ay = -500
    timer.after(500, function () {
        sprites.setDataBoolean(sprite, "Shooting", false)
        sprite.ay = 0
    })
})
sprites.onOverlap(SpriteKind.HammerStrike, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    timer.throttle("action", 500, function () {
        Destroy(otherSprite)
        scene.cameraShake(3, 500)
    })
})
function NextLevel () {
    Level += 1
    if (Level == 1) {
        info.setLife(3)
        tiles.setCurrentTilemap(tilemap`Level 2`)
        tiles.placeOnTile(PlayerSprite, tiles.getTileLocation(1, 34))
        tiles.placeOnTile(Cannon_U, tiles.getTileLocation(14, 33))
        tiles.placeOnTile(Cannon_D, tiles.getTileLocation(14, 35))
        tiles.placeOnTile(Cannon_L, tiles.getTileLocation(13, 34))
        tiles.placeOnTile(Cannon_R, tiles.getTileLocation(15, 34))
        Test_Enemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(Test_Enemy, tiles.getTileLocation(6, 19))
        Test_Enemy.setFlag(SpriteFlag.Invisible, false)
        Test_Enemy.setFlag(SpriteFlag.GhostThroughSprites, false)
    } else if (Level == 2) {
        info.setLife(3)
    } else {
        game.setGameOverEffect(true, effects.confetti)
        game.setGameOverScoringType(game.ScoringType.None)
        game.gameOver(true)
    }
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Ground_Pound) {
        PlayerSprite.vy = 700
        Ground_Pound = false
        if (PlayerSprite.isHittingTile(CollisionDirection.Bottom)) {
            Ground_Pound = false
        }
    }
})
// Add ground pound animations
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
sprites.onOverlap(SpriteKind.Player_Projectile, SpriteKind.TestEnemy2, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbar.value += -3
    Standard_Enemy.follow(PlayerSprite, 20)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Got_Bow) {
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
    } else if (Got_Hammer) {
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
function CharacterAnimations () {
    characterAnimations.runFrames(
    PlayerSprite,
    [img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 e . . . . 
        . . . . . . e 2 3 3 2 2 e . . . 
        . . . . . . . e 2 3 3 3 3 2 2 . 
        . . . . . . . . e 2 3 3 2 3 3 2 
        . . . . . . . . c e 2 3 3 2 2 2 
        . . . . . . . . 8 c 2 2 3 3 2 . 
        . . . . . . . . . 8 . . 2 2 2 . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 2 e . . . 
        . . . . . . e 2 3 3 3 3 3 2 . . 
        . . . . . . . e 2 2 3 3 3 3 2 . 
        . . . . . . . . e e 2 3 3 2 2 2 
        . . . . . . . . c e e 2 3 3 2 2 
        . . . . . . . . 8 c . e 2 2 e . 
        . . . . . . . . . 8 . . e 2 . . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . 2 . 
        . . . . . . . e 2 2 e . 2 2 3 2 
        . . . . . . e 2 2 2 2 2 3 3 3 2 
        . . . . . . e 2 3 3 3 3 3 3 2 . 
        . . . . . . . e 2 3 3 3 3 2 2 . 
        . . . . . . . . e e 2 2 2 3 3 2 
        . . . . . . . . c c . . e 2 2 2 
        . . . . . . . . 8 8 . . . . . . 
        . . . . . . . . . 8 . . . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . 2 2 
        . . . . . . . e 2 2 e . 2 2 3 2 
        . . . . . . e 2 2 3 3 2 3 3 2 . 
        . . . . . . e 2 3 3 3 3 3 2 2 . 
        . . . . . . . e 2 2 2 3 3 3 3 2 
        . . . . . . . . e e 2 2 2 2 3 2 
        . . . . . . . . c c . . . e 2 2 
        . . . . . . . . 8 c . . . . . . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . 2 2 2 
        . 8 . . . . c 8 b b 8 . 2 3 3 2 
        . . . . . . . e 2 2 e 2 3 2 2 . 
        . . . . . . e 2 2 2 3 3 3 3 3 2 
        . . . . . . e 2 3 3 3 3 3 3 2 e 
        . . . . . . . e 2 3 3 3 2 2 e . 
        . . . . . . . . e e e 2 e . . . 
        . . . . . . . . c c . . . . . . 
        . . . . . . . . 8 c . . . . . . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . 2 
        . . . . . . . e 2 2 e . . 2 2 2 
        . . . . . . e 2 2 3 3 2 2 3 3 2 
        . . . . . . e 2 3 3 3 3 3 3 2 2 
        . . . . . . . e 2 3 3 3 2 2 2 . 
        . . . . . . . . e e e 2 e . . . 
        . . . . . . . . c c . . . . . . 
        . . . . . . . . 8 c . . . . . . 
        . . . . . . . . . 8 . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . . e 2 2 2 2 e . . . . . . 
        . . . e 2 2 3 3 2 e . . . . . . 
        . 2 2 3 3 3 3 2 e . . . . . . . 
        2 3 3 2 3 3 2 e . . . . . . . . 
        2 2 2 3 3 2 e c . . . . . . . . 
        . 2 3 3 2 2 c 8 . . . . . . . . 
        . 2 2 2 . . 8 . . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `,img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . . e 2 2 2 2 e . . . . . . 
        . . . . 2 3 3 3 2 e . . . . . . 
        . . . 2 3 3 3 2 2 . . . . . . . 
        . . 2 2 3 3 2 2 . . . . . . . . 
        . 2 3 2 3 2 2 e . . . . . . . . 
        . 2 2 3 2 2 e 8 . . . . . . . . 
        . . 2 2 2 e 8 . . . . . . . . . 
        . . . 2 2 . 8 . . . . . . . . . 
        `,img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . . e 2 2 2 2 e . . . . . . 
        . . . . 2 3 3 3 2 e . . . . . . 
        . . . 2 3 3 3 2 2 . . . . . . . 
        . . 2 3 3 3 3 2 . . . . . . . . 
        . 2 3 2 3 3 2 e . . . . . . . . 
        2 3 2 3 3 2 e 8 . . . . . . . . 
        2 2 2 3 2 e 8 . . . . . . . . . 
        . . 2 2 2 . 8 . . . . . . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 e . . . . 
        . . . . . . e 2 3 3 2 2 e . . . 
        . . . . . . . e 2 3 3 3 3 2 2 . 
        . . . . . . . . e 2 3 3 2 3 3 2 
        . . . . . . . . c e 2 3 3 2 2 2 
        . . . . . . . . 8 c 2 2 3 3 2 . 
        . . . . . . . . . 8 . . 2 2 2 . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 e . . . . 
        . . . . . . e 2 3 3 3 2 . . . . 
        . . . . . . . 2 2 3 3 3 2 . . . 
        . . . . . . . . 2 2 3 3 2 2 . . 
        . . . . . . . . e 2 2 3 2 3 2 . 
        . . . . . . . . 8 e 2 2 3 2 2 . 
        . . . . . . . . . 8 e 2 2 2 . . 
        . . . . . . . . . 8 . 2 2 . . . 
        `,img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 e . . . . 
        . . . . . . e 2 3 3 3 2 . . . . 
        . . . . . . . 2 2 3 3 3 2 . . . 
        . . . . . . . . 2 3 3 3 3 2 . . 
        . . . . . . . . e 2 3 3 2 3 2 . 
        . . . . . . . . 8 e 2 3 3 2 3 2 
        . . . . . . . . . 8 e 2 3 2 2 2 
        . . . . . . . . . 8 . 2 2 2 . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        2 2 . . . 8 b b 8 c . . . . 8 . 
        2 3 2 2 . e 2 2 e . . . . . . . 
        . 2 3 3 2 3 3 2 2 e . . . . . . 
        2 3 2 3 3 3 3 3 2 e . . . . . . 
        2 2 3 3 3 2 2 2 e . . . . . . . 
        . 2 2 2 2 2 e e . . . . . . . . 
        . . . . . . c c . . . . . . . . 
        . . . . . . c 8 . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        2 2 2 . 8 b 3 3 b 8 c . . 8 b . 
        2 3 3 2 . 8 b b 8 c . . . . 8 . 
        . 2 3 3 2 e 2 2 e . . . . . . . 
        2 2 3 3 3 3 2 2 2 e . . . . . . 
        e 2 2 3 3 3 3 3 2 e . . . . . . 
        . e 2 2 3 3 3 2 e . . . . . . . 
        . . . e 2 e e e . . . . . . . . 
        . . . . . . c c . . . . . . . . 
        . . . . . . c 8 . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        2 . . . . 8 b b 8 c . . . . 8 . 
        2 2 2 . . e 2 2 e . . . . . . . 
        2 3 3 2 2 3 3 2 2 e . . . . . . 
        2 2 3 3 3 3 3 3 2 e . . . . . . 
        . 2 2 2 3 3 3 2 e . . . . . . . 
        . . . e 2 e e e . . . . . . . . 
        . . . . . . c c . . . . . . . . 
        . . . . . . c 8 . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 e . . . . 
        . . . . . . e 2 3 3 2 2 e . . . 
        . . . . . . . e 2 3 3 3 3 2 2 . 
        . . . . . . . . e 2 3 3 2 3 3 2 
        . . . . . . . . c e 2 3 3 2 2 2 
        . . . . . . . . 8 c 2 2 3 3 2 . 
        . . . . . . . . . 8 . . 2 2 2 . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 2 e . . . 
        . . . . . . e 2 3 3 3 3 3 2 . . 
        . . . . . . . e 2 2 3 3 3 3 2 . 
        . . . . . . . . e e 2 3 3 2 2 2 
        . . . . . . . . c e e 2 3 3 2 2 
        . . . . . . . . 8 c . e 2 2 e . 
        . . . . . . . . . 8 . . e 2 . . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 2 e . . . 
        . . . . . . e 2 3 3 3 2 2 2 2 2 
        . . . . . . . e 2 2 3 3 3 3 3 2 
        . . . . . . . . e 2 2 3 3 3 2 . 
        . . . . . . . . c e e 2 3 2 2 . 
        . . . . . . . . 8 c . e 2 2 e . 
        . . . . . . . . . 8 . . . . . . 
        . . . . . . . . . 8 . . . . . . 
        `],
    250,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . . e 2 2 2 2 e . . . . . . 
        . . . e 2 2 3 3 2 e . . . . . . 
        . 2 2 3 3 3 3 2 e . . . . . . . 
        2 3 3 2 3 3 2 e . . . . . . . . 
        2 2 2 3 3 2 e c . . . . . . . . 
        . 2 3 3 2 2 c 8 . . . . . . . . 
        . 2 2 2 . . 8 . . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `,img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . e 2 2 2 2 2 e . . . . . . 
        . . 2 3 3 3 3 3 2 e . . . . . . 
        . 2 3 3 3 3 2 2 e . . . . . . . 
        2 2 2 3 3 2 e e . . . . . . . . 
        2 2 3 3 2 e e c . . . . . . . . 
        . e 2 2 e . c 8 . . . . . . . . 
        . . 2 e . . 8 . . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `,img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . e 2 2 2 2 2 e . . . . . . 
        2 2 2 2 2 3 3 3 2 e . . . . . . 
        2 3 3 3 3 3 2 2 e . . . . . . . 
        . 2 3 3 3 2 2 e . . . . . . . . 
        . 2 2 3 2 e e c . . . . . . . . 
        . e 2 2 e . c 8 . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `],
    250,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 e . . . . 
        . . . . . . e 2 3 3 2 2 e . . . 
        . . . . . . . e 2 3 3 3 3 2 2 . 
        . . . . . . . . e 2 3 3 2 3 3 2 
        . . . . . . . . c e 2 3 3 2 2 2 
        . . . . . . . 8 8 c 2 2 3 3 2 . 
        . . . . . . . 8 c . c . 2 2 2 . 
        . . . . . . 8 . . . . c . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 2 2 2 e . . . 
        . . . . . . e 2 3 3 3 3 3 2 2 . 
        . . . . . . . e 2 2 3 3 3 3 2 2 
        . . . . . . . . c e e 2 3 3 2 2 
        . . . . . . . . 8 c c e 2 2 e . 
        . . . . . . . . . 8 c c e 2 . . 
        . . . . . . . . . 8 . . . . . . 
        `,img`
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 3 3 2 e . . . 
        . . . . . . e 2 3 3 3 2 2 2 2 2 
        . . . . . . . e 2 2 3 3 3 3 3 2 
        . . . . . . . . e 2 2 3 3 3 2 . 
        . . . . . . . . c e e 2 3 2 2 . 
        . . . . . . . c 8 8 c e 2 2 e . 
        . . . . . . . c c 8 8 . . . . . 
        . . . . . . c . . . . 8 . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b b . . . . . . 
        . . . . . b b d d d b . . . . . 
        . . . b b d d d 2 2 d b . . . . 
        . . b d d d b 2 3 3 2 b . . . . 
        . b d 8 8 b b 3 5 5 3 b . . . . 
        . b 8 . . c 8 b 3 3 b 8 . . . . 
        . 8 . . . . c 8 b b 8 . . . . . 
        . . . . . . . e 2 2 e . . . . . 
        . . . . . . e 2 2 3 2 2 . . 2 2 
        . . . . . . e e 2 3 3 3 2 2 3 2 
        . . . . . . . e e 2 3 3 3 3 2 . 
        . . . . . . . . c e 2 3 3 3 2 . 
        . . . . . . . . 8 c e 2 3 2 e . 
        . . . . . . . . . 8 . e 2 2 . . 
        . . . . . . . . . c 8 . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft, Predicate.HittingWallDown)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . . e 2 2 2 2 e . . . . . . 
        . . . e 2 2 3 3 2 e . . . . . . 
        . 2 2 3 3 3 3 2 e . . . . . . . 
        2 3 3 2 3 3 2 e . . . . . . . . 
        2 2 2 3 3 2 e c . . . . . . . . 
        . 2 3 3 2 2 c 8 8 . . . . . . . 
        . 2 2 2 . c . c 8 . . . . . . . 
        . . . . c . . . . 8 . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . e 2 2 2 2 2 e . . . . . . 
        . 2 2 3 3 3 3 3 2 e . . . . . . 
        2 2 3 3 3 3 2 2 e . . . . . . . 
        2 2 3 3 2 e e c . . . . . . . . 
        . e 2 2 e c c 8 . . . . . . . . 
        . . 2 e c c 8 . . . . . . . . . 
        . . . . . . 8 . . . . . . . . . 
        `,img`
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        . . . e 2 3 3 2 2 e . . . . . . 
        2 2 2 2 2 3 3 3 2 e . . . . . . 
        2 3 3 3 3 3 2 2 e . . . . . . . 
        . 2 3 3 3 2 2 e . . . . . . . . 
        . 2 2 3 2 e e c . . . . . . . . 
        . e 2 2 e c 8 8 c . . . . . . . 
        . . . . . 8 8 c c . . . . . . . 
        . . . . 8 . . . . c . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b . . . . . . . 
        . . . . . b d d d b b . . . . . 
        . . . . b d 2 2 d d d b b . . . 
        . . . . b 2 3 3 2 b d d d b . . 
        . . . . b 3 5 5 3 b b 8 8 d b . 
        . . . . 8 b 3 3 b 8 c . . 8 b . 
        . . . . . 8 b b 8 c . . . . 8 . 
        . . . . . e 2 2 e . . . . . . . 
        2 2 . . 2 2 3 2 2 e . . . . . . 
        2 3 2 2 3 3 3 2 e e . . . . . . 
        . 2 3 3 3 3 2 e e . . . . . . . 
        . 2 3 3 3 2 e c . . . . . . . . 
        . e 2 3 2 e c 8 . . . . . . . . 
        . . 2 2 e . 8 . . . . . . . . . 
        . . . . . 8 c . . . . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingRight, Predicate.HittingWallDown)
    )
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    Destroy(sprite)
})
function MakeVariables () {
    CannonBallImg = assets.image`Fire Right`
    CannonShooterImg = assets.image`cannonup`
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
}
sprites.onOverlap(SpriteKind.SwordSlash, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
let myDart: Dart = null
let cannon_projectile: Sprite = null
let DistanceFromPlayer = 0
let Jump = false
let CannonBallImg: Image = null
let Has_Sword = false
let Has_Hammer = false
let myMenu: miniMenu.MenuSprite = null
let Got_Sword = false
let Got_Hammer = false
let Level = 0
let Ground_Pound = false
let Look_Cute = false
let Facing_Left = false
let myEffect: SpreadEffectData = null
let statusbar: StatusBarSprite = null
let Standard_Enemy: Sprite = null
let Canon_Active = false
let Cannon_R: Sprite = null
let Cannon_L: Sprite = null
let Cannon_D: Sprite = null
let CannonShooterImg: Image = null
let Cannon_U: Sprite = null
let Test_Enemy: Sprite = null
let ShopKeeper: Sprite = null
let mySprite3: Sprite = null
let Has_Bow = false
let Got_Bow = false
let PlayerSprite: platformer.PlatformerSprite = null
stats.turnStats(true)
MakeVariables()
PlayerSprite = platformer.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
platformer.moveSprite(PlayerSprite, true, 75)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnUpPressed, true)
platformer.setGravity(500, platformer.Direction.Down)
scene.cameraFollowSprite(PlayerSprite)
platformer.setConstantDefault(platformer.PlatformerConstant.MaxJumpHeight, 40)
CharacterAnimations()
Effects()
Music()
profilelife.setMaxLife(3)
info.setLife(3)
profilelife.setFilledLifeImage(assets.image`Health`)
profilelife.setEmptyLifeImage(assets.image`HP lost`)
scene.setBackgroundImage(assets.image`Blue`)
MakeEnemies(1)
MakeTilemap()
game.showLongText("PHANTOMS                 A Collaboration Platformer", DialogLayout.Full)
game.showLongText("By Cursedeclipse, pecan4, Josef, CopySprite, TeddyB, Luke, JtSpeedRun, HaruhitoGames, Not-a-creepy-doll and InvalidProject", DialogLayout.Full)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (spriteutils.distanceBetween(PlayerSprite, value) < DistanceFromPlayer) {
            spriteutils.setVelocityAtAngle(value, spriteutils.angleFrom(PlayerSprite, value), 50)
        } else if (spriteutils.distanceBetween(PlayerSprite, value) >= DistanceFromPlayer) {
            value.follow(PlayerSprite, spriteutils.distanceBetween(PlayerSprite, value) * 1.5 + 10)
        }
    }
})
game.onUpdate(function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (!(sprites.readDataBoolean(value2, "Shooting"))) {
            if (PlayerSprite.x < value2.x) {
                animation.runImageAnimation(
                value2,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 2 2 . . . . . . 
                    . . . . . 2 2 3 3 3 e . . . . . 
                    . . . . 2 3 3 3 f f 3 e . . . . 
                    . . . 2 3 3 2 f f f f e . . . . 
                    . . 2 3 2 2 2 f 5 5 f e . . . . 
                    . . 2 2 . . e 2 f f 2 f . . . . 
                    . . . . . . . e 2 2 f . . . . . 
                    . . . . . . . e e f f . . . . . 
                    . . . . . . . e 2 2 2 f e . . . 
                    . . . . . . e 2 2 2 f e 2 e . . 
                    . . . . . . e 2 f e 2 f e e . . 
                    . . . . . . . e e f e f f f . . 
                    . . . . . . . . e f f f . f . . 
                    . . . . . . . . e f . f . . . . 
                    . . . . . . . . . f . . f . . . 
                    `],
                100,
                true
                )
            } else {
                animation.runImageAnimation(
                value2,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 2 2 2 . . . . . . . 
                    . . . . . e 3 3 3 2 2 . . . . . 
                    . . . . e 3 f f 3 3 3 2 . . . . 
                    . . . . e f f f f 2 3 3 2 . . . 
                    . . . . e f 5 5 f 2 2 2 3 2 . . 
                    . . . . f 2 f f 2 e . . 2 2 . . 
                    . . . . . f 2 2 e . . . . . . . 
                    . . . . . f f e e . . . . . . . 
                    . . . e f 2 2 2 e . . . . . . . 
                    . . e 2 e f 2 2 2 e . . . . . . 
                    . . e e f 2 e f 2 e . . . . . . 
                    . . f f f e f e e . . . . . . . 
                    . . f . f f f e . . . . . . . . 
                    . . . . f . f e . . . . . . . . 
                    . . . f . . f . . . . . . . . . 
                    `],
                100,
                true
                )
            }
        }
    }
})
game.onUpdateInterval(2000, function () {
    if (Canon_Active) {
        cannon_projectile = sprites.createProjectileFromSprite(CannonBallImg, Cannon_U, 0, -100)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        cannon_projectile = sprites.createProjectileFromSprite(scaling.rot(CannonBallImg, 180), Cannon_D, 0, 100)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        cannon_projectile = sprites.createProjectileFromSprite(scaling.rot(CannonBallImg, 270), Cannon_L, -100, 0)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        cannon_projectile = sprites.createProjectileFromSprite(scaling.rot(CannonBallImg, 90), Cannon_R, 100, 0)
        cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    }
})
game.onUpdateInterval(1000, function () {
    for (let value3 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (spriteutils.distanceBetween(PlayerSprite, value3) >= 20) {
            sprites.setDataBoolean(value3, "Shooting", true)
            if (PlayerSprite.x < value3.x) {
                animation.runImageAnimation(
                value3,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 2 2 . . . . . . 
                    . . . . . 2 2 3 3 3 e . . . . . 
                    . . . . 2 3 3 3 5 5 3 e . . . . 
                    . . . 2 3 3 2 5 5 5 5 e . . . . 
                    . . 2 3 2 2 2 5 5 5 5 e . . . . 
                    . . 2 2 . . e 2 5 5 2 f . . . . 
                    . . . . . . . e 2 2 f . . . . . 
                    . . . . . . . e e f f . . . . . 
                    . . . . . . . e 2 2 2 f e . . . 
                    . . . . . . e 2 2 2 f e 2 e . . 
                    . . . . . . e 2 f e 2 f e e . . 
                    . . . . . . . e e f e f f f . . 
                    . . . . . . . . e f f f . f . . 
                    . . . . . . . . e f . f . . . . 
                    . . . . . . . . . f . . f . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 2 2 . . . . . . 
                    . . . . . 2 2 3 3 3 e . . . . . 
                    . . . . 2 3 3 3 1 1 3 e . . . . 
                    . . . 2 3 3 2 1 1 1 1 e . . . . 
                    . . 2 3 2 2 2 1 1 1 1 e . . . . 
                    . . 2 2 . . e 2 1 1 2 f . . . . 
                    . . . . . . . e 2 2 f . . . . . 
                    . . . . . . . e e f f . . . . . 
                    . . . . . . . e 2 2 2 f e . . . 
                    . . . . . . e 2 2 2 f e 2 e . . 
                    . . . . . . e 2 f e 2 f e e . . 
                    . . . . . . . e e f e f f f . . 
                    . . . . . . . . e f f f . f . . 
                    . . . . . . . . e f . f . . . . 
                    . . . . . . . . . f . . f . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 2 2 . . . . . . 
                    . . . . . 2 2 3 3 3 e . . . . . 
                    . . . . 2 3 3 3 d d 3 e . . . . 
                    . . . 2 3 3 2 d 5 5 d e . . . . 
                    . . 2 3 2 2 2 5 1 1 5 e . . . . 
                    . . 2 2 . . e 2 5 5 2 f . . . . 
                    . . . . . . . e 2 2 f . . . . . 
                    . . . . . . . e e f f . . . . . 
                    . . . . . . . e 2 2 2 f e . . . 
                    . . . . . . e 2 2 2 f e 2 e . . 
                    . . . . . . e 2 f e 2 f e e . . 
                    . . . . . . . e e f e f f f . . 
                    . . . . . . . . e f f f . f . . 
                    . . . . . . . . e f . f . . . . 
                    . . . . . . . . . f . . f . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 2 2 . . . . . . 
                    . . . . . 2 2 3 3 3 e . . . . . 
                    . . . . 2 3 3 3 d d 3 e . . . . 
                    . . . 2 3 3 2 d 5 5 d e . . . . 
                    . . 2 3 2 2 2 5 1 1 5 e . . . . 
                    . . 2 2 . . e 2 5 5 2 f . . . . 
                    . . . . . . . e 2 2 f . . . . . 
                    . . . . . . . e e f f . . . . . 
                    . . . . . . . e 2 2 2 f e . . . 
                    . . . . . . e 2 2 2 f e 2 e . . 
                    . . . . . . e 2 f e 2 f e e . . 
                    . . . . . . . e e f e f f f . . 
                    . . . . . . . . e f f f . f . . 
                    . . . . . . . . e f . f . . . . 
                    . . . . . . . . . f . . f . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 2 2 . . . . . . 
                    . . . . . 2 2 3 3 3 e . . . . . 
                    . . . . 2 3 3 3 f f 3 e . . . . 
                    . . . 2 3 3 2 f f f f e . . . . 
                    . . 2 3 2 2 2 f 5 5 f e . . . . 
                    . . 2 2 . . e 2 f f 2 f . . . . 
                    . . . . . . . e 2 2 f . . . . . 
                    . . . . . . . e e f f . . . . . 
                    . . . . . . . e 2 2 2 f e . . . 
                    . . . . . . e 2 2 2 f e 2 e . . 
                    . . . . . . e 2 f e 2 f e e . . 
                    . . . . . . . e e f e f f f . . 
                    . . . . . . . . e f f f . f . . 
                    . . . . . . . . e f . f . . . . 
                    . . . . . . . . . f . . f . . . 
                    `],
                100,
                false
                )
            } else {
                animation.runImageAnimation(
                value3,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 2 2 2 . . . . . . . 
                    . . . . . e 3 3 3 2 2 . . . . . 
                    . . . . e 3 5 5 3 3 3 2 . . . . 
                    . . . . e 5 5 5 5 2 3 3 2 . . . 
                    . . . . e 5 5 5 5 2 2 2 3 2 . . 
                    . . . . f 2 5 5 2 e . . 2 2 . . 
                    . . . . . f 2 2 e . . . . . . . 
                    . . . . . f f e e . . . . . . . 
                    . . . e f 2 2 2 e . . . . . . . 
                    . . e 2 e f 2 2 2 e . . . . . . 
                    . . e e f 2 e f 2 e . . . . . . 
                    . . f f f e f e e . . . . . . . 
                    . . f . f f f e . . . . . . . . 
                    . . . . f . f e . . . . . . . . 
                    . . . f . . f . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 2 2 2 . . . . . . . 
                    . . . . . e 3 3 3 2 2 . . . . . 
                    . . . . e 3 1 1 3 3 3 2 . . . . 
                    . . . . e 1 1 1 1 2 3 3 2 . . . 
                    . . . . e 1 1 1 1 2 2 2 3 2 . . 
                    . . . . f 2 1 1 2 e . . 2 2 . . 
                    . . . . . f 2 2 e . . . . . . . 
                    . . . . . f f e e . . . . . . . 
                    . . . e f 2 2 2 e . . . . . . . 
                    . . e 2 e f 2 2 2 e . . . . . . 
                    . . e e f 2 e f 2 e . . . . . . 
                    . . f f f e f e e . . . . . . . 
                    . . f . f f f e . . . . . . . . 
                    . . . . f . f e . . . . . . . . 
                    . . . f . . f . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 2 2 2 . . . . . . . 
                    . . . . . e 3 3 3 2 2 . . . . . 
                    . . . . e 3 d d 3 3 3 2 . . . . 
                    . . . . e d 5 5 d 2 3 3 2 . . . 
                    . . . . e 5 1 1 5 2 2 2 3 2 . . 
                    . . . . f 2 5 5 2 e . . 2 2 . . 
                    . . . . . f 2 2 e . . . . . . . 
                    . . . . . f f e e . . . . . . . 
                    . . . e f 2 2 2 e . . . . . . . 
                    . . e 2 e f 2 2 2 e . . . . . . 
                    . . e e f 2 e f 2 e . . . . . . 
                    . . f f f e f e e . . . . . . . 
                    . . f . f f f e . . . . . . . . 
                    . . . . f . f e . . . . . . . . 
                    . . . f . . f . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 2 2 2 . . . . . . . 
                    . . . . . e 3 3 3 2 2 . . . . . 
                    . . . . e 3 d d 3 3 3 2 . . . . 
                    . . . . e d 5 5 d 2 3 3 2 . . . 
                    . . . . e 5 1 1 5 2 2 2 3 2 . . 
                    . . . . f 2 5 5 2 e . . 2 2 . . 
                    . . . . . f 2 2 e . . . . . . . 
                    . . . . . f f e e . . . . . . . 
                    . . . e f 2 2 2 e . . . . . . . 
                    . . e 2 e f 2 2 2 e . . . . . . 
                    . . e e f 2 e f 2 e . . . . . . 
                    . . f f f e f e e . . . . . . . 
                    . . f . f f f e . . . . . . . . 
                    . . . . f . f e . . . . . . . . 
                    . . . f . . f . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 2 2 2 . . . . . . . 
                    . . . . . e 3 3 3 2 2 . . . . . 
                    . . . . e 3 f f 3 3 3 2 . . . . 
                    . . . . e f f f f 2 3 3 2 . . . 
                    . . . . e f 5 5 f 2 2 2 3 2 . . 
                    . . . . f 2 f f 2 e . . 2 2 . . 
                    . . . . . f 2 2 e . . . . . . . 
                    . . . . . f f e e . . . . . . . 
                    . . . e f 2 2 2 e . . . . . . . 
                    . . e 2 e f 2 2 2 e . . . . . . 
                    . . e e f 2 e f 2 e . . . . . . 
                    . . f f f e f e e . . . . . . . 
                    . . f . f f f e . . . . . . . . 
                    . . . . f . f e . . . . . . . . 
                    . . . f . . f . . . . . . . . . 
                    `],
                100,
                false
                )
            }
            timer.background(function () {
                for (let index = 0; index < 4; index++) {
                    myDart = darts.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . 3 3 . . . . . . . 
                        . . . . . . 3 5 5 3 . . . . . . 
                        . . . . . . 2 5 5 2 . . . . . . 
                        . . . . . . . 2 2 . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Projectile, value3.x, value3.y)
                    // Randomness
                    spriteutils.setVelocityAtAngle(myDart, spriteutils.angleFrom(value3, PlayerSprite) + spriteutils.degreesToRadians(randint(-10, 10)), 70)
                }
                timer.after(800, function () {
                    sprites.setDataBoolean(value3, "Shooting", false)
                })
            })
        }
    }
})
game.onUpdateInterval(200, function () {
    DistanceFromPlayer = randint(30, 60)
})
