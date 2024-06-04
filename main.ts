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
/**
 * -pecan4
 */
// Make sure to use comments and link them to the blocks or else if you click format they'll go to one area!
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    if (In_game) {
        tiles.setCurrentTilemap(tilemap`Also Level 3`)
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
        game.showLongText("You got the Phantom bow!        You have infinite arrows!", DialogLayout.Top)
        Got_Bow = true
        if (game.ask("Equip now? ")) {
            Has_Bow = true
        } else {
            game.showLongText("Alright then.", DialogLayout.Top)
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PhantomPlayerSprite.isHittingTile(CollisionDirection.Bottom) || PhantomPlayerSprite.isHittingTile(CollisionDirection.Right) || PhantomPlayerSprite.isHittingTile(CollisionDirection.Left)) {
        extraEffects.createSpreadEffectOnAnchor(PhantomPlayerSprite, EffectJump, 500, 10, 20)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TestEnemy2, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(PhantomPlayerSprite, assets.tile`Start`)
})
function destroy_all_sprites () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Null)
    sprites.destroyAllSpritesOfKind(SpriteKind.Blaster)
    sprites.destroyAllSpritesOfKind(SpriteKind.ShopGuy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player_Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.HammerStrike)
    sprites.destroyAllSpritesOfKind(SpriteKind.SwordSlash)
    sprites.destroyAllSpritesOfKind(SpriteKind.TestEnemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.TestEnemy2)
    sprites.destroyAllSpritesOfKind(SpriteKind.Block)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.MiniMenu)
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Next0`, function (sprite, location) {
    if (In_game) {
        info.setLife(3)
        scene.setBackgroundImage(assets.image`Gray`)
        tiles.setCurrentTilemap(tilemap`Level 3`)
        tiles.placeOnRandomTile(PhantomPlayerSprite, assets.tile`Start`)
        Standard_Enemy = sprites.create(assets.image`Normal Enemy`, SpriteKind.Enemy)
        Standard_Enemy.follow(PhantomPlayerSprite, 10)
        statusbar = statusbars.create(20, 3, StatusBarKind.TestHP)
        statusbar.max = 8
        statusbar.value = 8
        statusbar.attachToSprite(Standard_Enemy)
        statusbar.setColor(3, 15, 1)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        tiles.placeOnTile(Standard_Enemy, tiles.getTileLocation(53, 9))
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Finish`, function (sprite, location) {
    if (In_game) {
        NextLevel()
    }
})
function Effects () {
    EffectJump = extraEffects.createCustomSpreadEffectData(
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
statusbars.onZero(StatusBarKind.TestHP, function (status) {
    if (In_game) {
        sprites.destroy(Standard_Enemy, effects.disintegrate, 500)
        info.changeScoreBy(10)
        tiles.setCurrentTilemap(tilemap`also Level 3`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TestEnemy, function (sprite, otherSprite) {
    if (In_game) {
        if (true) {
            sprites.destroy(otherSprite, effects.confetti, 500)
            info.changeScoreBy(5)
        } else if (Ground_Pound) {
            sprites.destroy(otherSprite, effects.disintegrate, 500)
            info.changeScoreBy(5)
        } else {
            info.changeLifeBy(-1)
            tiles.placeOnRandomTile(PhantomPlayerSprite, assets.tile`Start`)
        }
    }
})
sprites.onOverlap(SpriteKind.Player_Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 200)
})
function Fancily_Destroy (sprite: Sprite) {
    sprite.setVelocity(0, 0)
    sprite.setKind(SpriteKind.Null)
    animation.runImageAnimation(
    sprite,
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
        sprites.destroy(sprite)
    })
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprite.follow(PhantomPlayerSprite, -10)
    sprites.setDataBoolean(sprite, "Shooting", true)
    sprite.ay = -500
    timer.after(500, function () {
        sprites.setDataBoolean(sprite, "Shooting", false)
        sprite.ay = 0
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (In_game) {
        timer.throttle("action", 500, function () {
            Fancily_Destroy(otherSprite)
            info.changeLifeBy(-1)
            scene.cameraShake(3, 500)
        })
    }
})
function NextLevel () {
    Level += 1
    if (Level == 1) {
        tiles.setCurrentTilemap(tilemap`Level 2`)
        tiles.placeOnTile(PhantomPlayerSprite, tiles.getTileLocation(1, 34))
    } else if (Level == 2) {
        info.setLife(3)
    } else {
        game.setGameOverEffect(true, effects.confetti)
        game.setGameOverScoringType(game.ScoringType.None)
        game.gameOver(true)
    }
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    if (In_game) {
        if (Ground_Pound) {
            PhantomPlayerSprite.vy = 700
            Ground_Pound = false
            if (PhantomPlayerSprite.isHittingTile(CollisionDirection.Bottom)) {
                Ground_Pound = false
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player_Projectile, SpriteKind.TestEnemy2, function (sprite, otherSprite) {
    if (In_game) {
        sprites.destroy(sprite)
        statusbar.value += -3
        Standard_Enemy.follow(PhantomPlayerSprite, 20)
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (In_game) {
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
    }
})
info.onLifeZero(function () {
    screenshot_image = image.screenImage().clone()
    In_game = false
    timer.background(function () {
        profilelife.setInvisible(true)
        music.stopAllSounds()
        extraEffects.createSpreadEffectOnAnchor(PhantomPlayerSprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 200)
        sprites.destroy(PhantomPlayerSprite)
        characterAnimations.setCharacterAnimationsEnabled(PhantomPlayerSprite, false)
        music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(1000)
        destroy_all_sprites()
        tileUtil.unloadTilemap()
        destroy_all_sprites()
        scene.setBackgroundImage(screenshot_image)
        spriteutils.drawTransparentImage(img`
            ...............................................................fff...............................ff...
            ..............................................................fffff.............................fffff.
            .............................................................fff5ff.............................fffff.
            ........ffff......fffffff........ff.....ffff................fff5fff.............................ff5ff.
            .....fffffffff..fffffffffff.....ffff.fffffffff.............fff5fff..............................ff55f.
            ...fffff555fffffffff55555ff....ff5fffffff555fff............ff55ff.....................ff........ff55ff
            ...ff55555555ffff55555555ff....ff55fff55555555ff..........ff55ff.....................f5ff.......ff55ff
            ...ff5f5ffff55fff55fffffff....fff5ffff555ffff5fff.........ff5fff....................f5555f.......ff5ff
            ...fff55ffff55fff5fffffff.....ff55fffff55ffff55ff........ff55ff...fff...fffff...fff.ff55fffffff..ff5ff
            ....ff5ffffff5fff5ff..........ff55fffff5ffffff5ff........ff55ff..fffff.ffffffffffffffffffffffffffff5ff
            ....ff5ff..ff5ff55ff.........ff555fffff5ff..ff5ff........ff5ff..fff5fffff555fffff5ffff5fffff55fffff5ff
            ...ff55ff..ff55f55fffff.....fff555ffff55ff..ff5ff.......ff55ff.fff555fff55f5ffff555fff5ff55555ffff55ff
            ...ff55ff..ff5ff5fffffff....ff5555ffff5ff...ff5ff.......ff55fffff5f55ff55f55fff5f55ff55ff555f55fff55ff
            ...ff5ff...ff5ff555555ff...fff5f55ffff5ff...ff5ff.......ff55ffff55f55ff5ff55ff55f55ff55ff555f5ffff5ff.
            ...ff5ff...ff5ff5ffffffffffff55f55fff55ff..ff55ff.......ff55fff55f555f55ff5ff55f555ff5fff55ff5ffff5ff.
            ..ff55ff..ff55f55fffffffffff55ff55fff55ff..ff55ff.......ff5ffff5ff555f55ff5ff5ff555ff5ff555f55fff55ff.
            ..ff55ff..ff55f55ff....fff555fff55fff55f..fff5ff........ff5fff55f5555f55f55f55f5555ff5ff55ff55fff5ff..
            ..ff5fff.ff55ff5ff.....ff5555555555ff5ff..ff55ff........ff5fff5555f55f5555555555f55f55ff55ff55ff55ff..
            ..ff5ffffff5fff5ff.....fff55fffff5fff5ffffff5fff........ff55ff555ff55f555555555ff55f555f5fff55ff5ff...
            ffff5fffff55ff55fffffffff55ffffff5ff55fffff5ffffff......ff55ffffffffffff555ffffffffffffffffffff55ff...
            fff55fff555fff55ffffffff55fff..ff5ff55fff55fff555f......ff55fffffffffff555ffffffffffffffffffff55ff....
            ff5555555fffff55555555555fff...ff555555555ffff555f.......ff5fff....fff55f5ff..............fff55fff....
            fff55ffffffffffffffffffffff....fffff5fffffffff555f.......ff55ff....ff55f55ff..............ff55fff.....
            .ffffffff...ffffffffffffff......ffffffffff...fffff.......fff5ff....ff5ff55f...............ff5fff......
            ..ffff...............fff..........ffff.........ff.........fffff....ff5ff5ff...............fffff.......
            ..........................................................ffff.....ff555fff................ff.........
            ...................................................................fffffff............................
            ....................................................................fffff.............................
            `, scene.backgroundImage(), 30, 20)
music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
        scene.cameraShake(3, 250)
        pause(5000)
        game.setGameOverPlayable(false, music.createSong(assets.song`Game Over`), false)
        game.setGameOverEffect(false, effects.splatter)
        game.gameOver(false)
    })
})
function CharacterAnimations () {
    characterAnimations.runFrames(
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    PhantomPlayerSprite,
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
    Fancily_Destroy(sprite)
})
let myDart: Dart = null
let cannon_projectile: Dart = null
let DistanceFromPlayer = 0
let screenshot_image: Image = null
let myMenu: miniMenu.MenuSprite = null
let Level = 0
let statusbar: StatusBarSprite = null
let Standard_Enemy: Sprite = null
let EffectJump: SpreadEffectData = null
let Ground_Pound = false
let Got_Sword = false
let Got_Hammer = false
let Got_Bow = false
let Has_Hammer = false
let Has_Sword = false
let Has_Bow = false
let In_game = false
let PhantomPlayerSprite: platformer.PlatformerSprite = null
let Jump = false
let Facing_Left = false
Effects()
stats.turnStats(true)
info.setLife(5)
scene.setBackgroundImage(img`
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    `)
PhantomPlayerSprite = platformer.create(img`
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
platformer.moveSprite(PhantomPlayerSprite, true, 75)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnUpPressed, true)
platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnAPressed, false)
platformer.setGravity(500, platformer.Direction.Down)
scene.cameraFollowSprite(PhantomPlayerSprite)
platformer.setConstantDefault(platformer.PlatformerConstant.MaxJumpHeight, 60)
CharacterAnimations()
let mySprite3 = sprites.create(img`
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
game.showLongText("PHANTOMS                 A Collaboration Platformer", DialogLayout.Full)
game.showLongText("By Cursedeclipse, pecan4, Josef, CopySprite, TeddyB, Luke, JtSpeedRun, HaruhitoGames, Not-a-creepy-doll and InvalidProject", DialogLayout.Full)
tiles.setCurrentTilemap(tilemap`level12`)
let ShopKeeper = sprites.create(assets.image`ShopKeeper`, SpriteKind.ShopGuy)
tiles.placeOnRandomTile(PhantomPlayerSprite, assets.tile`Start`)
In_game = true
Has_Bow = false
Has_Sword = false
Has_Hammer = false
Got_Bow = false
Got_Hammer = false
Got_Sword = false
Ground_Pound = false
ShopKeeper.setFlag(SpriteFlag.Invisible, true)
PhantomPlayerSprite.setFlag(SpriteFlag.StayInScreen, true)
profilelife.setMaxLife(5)
info.setLife(5)
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
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (spriteutils.distanceBetween(PhantomPlayerSprite, value) < DistanceFromPlayer) {
            spriteutils.setVelocityAtAngle(value, spriteutils.angleFrom(PhantomPlayerSprite, value), 50)
        } else if (spriteutils.distanceBetween(PhantomPlayerSprite, value) >= DistanceFromPlayer) {
            value.follow(PhantomPlayerSprite, spriteutils.distanceBetween(PhantomPlayerSprite, value) * 1.5 + 10)
        }
    }
})
game.onUpdate(function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (!(sprites.readDataBoolean(value2, "Shooting"))) {
            if (PhantomPlayerSprite.x < value2.x) {
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
    if (In_game) {
        for (let value3 of tiles.getTilesByType(assets.tile`Upward cannon tile`)) {
            cannon_projectile = darts.create(img`
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . 4 6 6 4 . . . . . . 
                . . . . . . 4 6 6 4 . . . . . . 
                . . . . . 4 6 4 4 6 4 . . . . . 
                . . . . . 4 6 4 4 6 4 . . . . . 
                . . . . 4 6 4 4 4 4 6 4 . . . . 
                . . . . 4 6 4 4 4 4 6 4 . . . . 
                . . . 4 6 4 4 4 4 4 4 6 4 . . . 
                . . . 4 6 4 4 4 4 4 4 6 4 . . . 
                . . 4 6 4 4 4 4 4 4 4 4 6 4 . . 
                . . 4 6 4 4 4 4 4 4 4 4 6 4 . . 
                . 4 6 4 4 4 4 4 4 4 4 4 4 6 4 . 
                . 4 6 4 4 4 4 4 4 4 4 4 4 6 4 . 
                4 6 6 6 6 6 6 6 6 6 6 6 6 6 6 4 
                . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
                `, SpriteKind.Projectile)
            cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(cannon_projectile, value3)
            sprites.setDataNumber(cannon_projectile, "damage", 1)
            cannon_projectile.setVelocity(0, -100)
        }
        for (let value4 of tiles.getTilesByType(assets.tile`myTile16`)) {
            cannon_projectile = darts.create(img`
                . 4 . . . . . . . . . . . . . . 
                4 6 4 4 . . . . . . . . . . . . 
                4 6 6 6 4 4 . . . . . . . . . . 
                4 6 4 4 6 6 4 4 . . . . . . . . 
                4 6 4 4 4 4 6 6 4 4 . . . . . . 
                4 6 4 4 4 4 4 4 6 6 4 4 . . . . 
                4 6 4 4 4 4 4 4 4 4 6 6 4 4 . . 
                4 6 4 4 4 4 4 4 4 4 4 4 6 6 4 4 
                4 6 4 4 4 4 4 4 4 4 4 4 6 6 4 4 
                4 6 4 4 4 4 4 4 4 4 6 6 4 4 . . 
                4 6 4 4 4 4 4 4 6 6 4 4 . . . . 
                4 6 4 4 4 4 6 6 4 4 . . . . . . 
                4 6 4 4 6 6 4 4 . . . . . . . . 
                4 6 6 6 4 4 . . . . . . . . . . 
                4 6 4 4 . . . . . . . . . . . . 
                . 4 . . . . . . . . . . . . . . 
                `, SpriteKind.Projectile)
            cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(cannon_projectile, value4)
            sprites.setDataNumber(cannon_projectile, "damage", 1)
            cannon_projectile.setVelocity(100, 0)
        }
        for (let value5 of tiles.getTilesByType(assets.tile`myTile17`)) {
            cannon_projectile = darts.create(img`
                . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
                4 6 6 6 6 6 6 6 6 6 6 6 6 6 6 4 
                . 4 6 4 4 4 4 4 4 4 4 4 4 6 4 . 
                . 4 6 4 4 4 4 4 4 4 4 4 4 6 4 . 
                . . 4 6 4 4 4 4 4 4 4 4 6 4 . . 
                . . 4 6 4 4 4 4 4 4 4 4 6 4 . . 
                . . . 4 6 4 4 4 4 4 4 6 4 . . . 
                . . . 4 6 4 4 4 4 4 4 6 4 . . . 
                . . . . 4 6 4 4 4 4 6 4 . . . . 
                . . . . 4 6 4 4 4 4 6 4 . . . . 
                . . . . . 4 6 4 4 6 4 . . . . . 
                . . . . . 4 6 4 4 6 4 . . . . . 
                . . . . . . 4 6 6 4 . . . . . . 
                . . . . . . 4 6 6 4 . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                `, SpriteKind.Projectile)
            cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(cannon_projectile, value5)
            sprites.setDataNumber(cannon_projectile, "damage", 1)
            cannon_projectile.setVelocity(0, 100)
        }
        for (let value6 of tiles.getTilesByType(assets.tile`myTile18`)) {
            cannon_projectile = darts.create(assets.image`Fire Up`, SpriteKind.Projectile)
            cannon_projectile.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(cannon_projectile, value6)
            sprites.setDataNumber(cannon_projectile, "damage", 1)
            cannon_projectile.setVelocity(-100, 0)
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value32 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (spriteutils.distanceBetween(PhantomPlayerSprite, value32) >= 20) {
            sprites.setDataBoolean(value32, "Shooting", true)
            if (PhantomPlayerSprite.x < value32.x) {
                animation.runImageAnimation(
                value32,
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
                value32,
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
                for (let index = 0; index < 2; index++) {
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
                        `, SpriteKind.Projectile, value32.x, value32.y)
                    sprites.setDataNumber(myDart, "damage", 1)
                    // Randomness
                    spriteutils.setVelocityAtAngle(myDart, spriteutils.angleFrom(value32, PhantomPlayerSprite) + spriteutils.degreesToRadians(randint(-10, 10)), 70)
                }
                timer.after(800, function () {
                    sprites.setDataBoolean(value32, "Shooting", false)
                })
            })
        }
    }
})
game.onUpdateInterval(200, function () {
    if (In_game) {
        DistanceFromPlayer = randint(30, 60)
    }
})
