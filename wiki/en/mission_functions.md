---
title: Mission Functions
permalink: /en/Mission_Functions
published: true
---

{% include git-wiki/components/toc/toc-include.html %}

# Evacuation Addon Setup

The Evacuation addon allows player casualties to be converted into AI ones, the players are then able to reinforce at a pre-defined location and the casualty evacuated at a later point.
<br><br>
This reinforce point needs to be defined to set where the players will be teleported to after conversion, this should be at a pre-established friendly position, preferably close to a transport method the players will use to get back.

The evacuation object(s) need to be defined to allow the casualty to be evacuated and to return the used casualty ticket, this should be at a pre-established friendly position, potentially inside a medical building.
<br><br>
Additionally if use of respawn tickets is desired (recommended), respawn ticket subtraction needs to be enabled in the mission attributes.

### Defining evacuation and reinforce points
{:.no_toc}
#### Reinforce Point
The Reinforce Point defines where converted players will be teleported to.

- Only one Reinforce Point per faction will be active at once, if there are multiple the last initialized will be used

<br><br>
<big>**Module Attributes**</big><br>
**Player Side** - Define which faction the reinforce point is intended for

{% include video.html v="/wiki/image/mission_modules/reinforce_point.webm" type="video/webm" gif="true" s="50" f="center" t="Reinforce Point Module" %}

#### Evacuation Point
The Evacuation Point controls what objects can be used to evacuate converted casualties.

- The target object must not be a simple object
- The target object(s) should be made indestructible to avoid issues

<br><br>
<big>**Module Attributes**</big><br>
**Player Side** - Define which faction the evacuation point is intended for<br>
**Interaction Distance** - Default: `5`<br>
**Interaction Position** - Default: `[0,0,0]`

{% include video.html v="/wiki/image/mission_modules/evacuation_point.webm" type="video/webm" gif="true" s="50" f="center" t="Evacuation Point Module" %}

### Enabling respawn ticket subtraction in mission file
{:.no_toc}
Enable ticket subtraction upon unit death, this will make player and converted casualty deaths in the player faction consume respawn tickets.

<img src="{{ '/wiki/image/mission_subtract_tickets.png' | relative_url }}" height="150">

# Full-Heal Facility
The full-heal facility allows easily defining objects that can fully heal select or all units inside it.

- The target object must not be a simple object
- The target object(s) should be made indestructible to avoid issues

<br><br>
<big>**Module Attributes**</big><br>
**Interaction Distance** - Default: `5`<br>
**Interaction Position** - Default: `[0,0,0]`

{% include video.html v="/wiki/image/mission_modules/full_heal_facility.webm" type="video/webm" gif="true" s="50" f="center" t="Full-Heal Facility Module" %}

<img src="{{ '/wiki/image/mission_healtent_use.png' | relative_url }}" height="500">

# Custom Blood Type List
The custom blood type list allows overwriting SteamID-based blood types, and setting specific blood types for each player, for example based on the player's real blood type.
<br><br>
A function needs to be entered into the mission init field which will define the set blood types of select SteamIDs.

### Enabling custom blood type list in circulation settings
{:.no_toc}
<img src="{{ '/wiki/image/mission_custom_bloodlist_enable.png' | relative_url }}" height="50">

### Defining Blood Types
{:.no_toc}

- Enter this code into the init field in the mission attributes:<br>
  - `[[["<STEAMID>",<ID>]]] call ACM_mission_fnc_createCustomBloodTypeList;`
- This will bind the desired blood type to the set SteamID(s).

<table style = "width:8%;">
    <tr>
        <th>Blood Type</th>
        <th>ID</th>
    </tr>
    <tr>
        <td>O+</td>
        <td>0</td>
    </tr>
    <tr>
        <td>O-</td>
        <td>1</td>
    </tr>
    <tr>
        <td>A+</td>
        <td>2</td>
    </tr>
    <tr>
        <td>A-</td>
        <td>3</td>
    </tr>
    <tr>
        <td>B+</td>
        <td>4</td>
    </tr>
    <tr>
        <td>B-</td>
        <td>5</td>
    </tr>
    <tr>
        <td>AB+</td>
        <td>6</td>
    </tr>
    <tr>
        <td>AB-</td>
        <td>7</td>
    </tr>
</table>

#### Example:
{:.no_toc}
`[[["76561197960287930",1],["76561195961284930",4]]] call ACM_mission_fnc_createCustomBloodTypeList;`<br>
- **76561197960287930** will have blood type **O-**, and **76561195961284930** will have blood type **B+**.

<img src="{{ '/wiki/image/mission_custombloodlist.png' | relative_url }}" height="400">

# Casualty Spawner
The casualty spawner allows easily adding a way to spawn casualties with varying severity for training purposes.
<br><br>
The reference object needs to be created to set where the casualties will be spawned.

The training computer object needs to be created to allow the player to spawn casualties at the set severity.

### Reference Object
{:.no_toc}
- Create a new object and set its variable name to something unique (eg. `ACM_mission_TrainingSpot1`).
  - This variable will be used in the training computer object to reference this one.
- This object will be used as a reference where the casualties should spawn, it can be hidden if required.

<img src="{{ '/wiki/image/mission_training_computer_ref.png' | relative_url }}" height="750">

### Training Computer
{:.no_toc}
- Create a new object and enter this code into its init field:<br>
`[this, variable] call ACM_mission_fnc_initTrainingComputer`
  - Where `this` is the interaction object, and `variable` is the variable name of the reference object (eg. `ACM_mission_TrainingSpot1`).
- This object will have all the ACE interactions for spawning, healing and clearing casualties.

<img src="{{ '/wiki/image/mission_trainingcomputer.png' | relative_url }}" height="750">