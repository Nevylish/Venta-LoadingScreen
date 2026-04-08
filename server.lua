AddEventHandler('playerConnecting', function(_, _, deferrals)
    local source = source

    -- You can modify 'name' to display a different name on the loading screen.
    -- By default, this displays the player's FiveM/Steam name (GetPlayerName).
    -- Example for an RP server: you could execute an SQL query here
    -- to fetch the character's first/last name and pass it to the 'name' variable.
    deferrals.handover({
        name = GetPlayerName(source)
    })
end)
