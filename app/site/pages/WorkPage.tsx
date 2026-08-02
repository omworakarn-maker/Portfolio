"use client";
import { PageEnd, PageHero } from "../components/PageFrame";
import { SelectedWorkShowcase } from "../components/ProjectKit";

export function WorkPage() {
    return <><PageHero page="work" /><SelectedWorkShowcase /><PageEnd /></>;
}

