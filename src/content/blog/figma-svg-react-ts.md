---
title: 'Setting up a Figma + React Icon System'
description: 'How to set up an icon system using React and Figma.'
publishDate: 'Mar 21 2024'
type: tutorial
---

It's 2024 and exporting icons from a supplied Figma and into your React application is not as simple as you think it would be.
There are many common problems that I have seen in my experience and have even encountered multiple times across different frameworks. Some problems are:

- Copy and pasting a lot of SVG code
- Exporting a lot of SVGs
- Applying compression in a directory containing these SVGs
- Unable to synchronise icon updates
- Inconsistent formatting and styling required for responsive font styling

The principles remain the same, but the solution has never been quite streamlined. There have been very few instances where I would have a script that would still work after nearly 5 years - where usually solutions change with the wind but I'd thought I would share how I resolve icon systems.

Just as a disclaimer, this tutorial is not about using an icon font or using existing icon libraries. Nor is it about which framework or design software is better - it's about optimising our workflow with designers who produce custom icons in Figma and how we synchronise the formatting and updates that may happen with very little friction.

# The goals

- Being able to synchonise icons with your codebase without manual intervention
- Improve responsive styling and flexibility
-

So let's get started.

# Figma API

So it goes without saying, you would need access to the Figma file that contains the icons.

Now it already gets tricky, because designers may have multiple ways of setting up their files and naming conventions but as a baseline - the
