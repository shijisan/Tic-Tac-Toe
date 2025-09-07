"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardAction, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { X, Circle, BriefcaseBusiness, RotateCcw } from "lucide-react"
import Link from "next/link"

type Player = "Player X" | "Player O" | null;

export default function Game() {

	const [tiles, setTiles] = useState<Player[]>(Array(9).fill(null));
	const [turn, setTurn] = useState<"Player X" | "Player O">("Player X");
	const winCon = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	const [winner, setWinner] = useState<Player | "Draw">(null);
	const [btnDisabled, setBtnDisabled] = useState(Array(9).fill(false));
	const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });

	const handleSwitchTurn = () => {
		setTurn(prev => prev === "Player X" ? "Player O" : "Player X");
	}

	const handleTileClick = (index: number) => {

		setTiles((prev: Player[]) => {
			const tilesCopy = [...prev];
			tilesCopy[index] = turn;
			return tilesCopy;
		});

		handleSwitchTurn();

	}

	const handlePlayAgain = () => {
		setTiles(Array(9).fill(null));
		setBtnDisabled(Array(9).fill(false));
		setWinner(null);
	}

	const handleResetScore = () => {
		setScores({ X: 0, O: 0, Draw: 0 });
	}


	useEffect(() => {
		console.log(tiles, turn);
		for (const [a, b, c] of winCon) {
			if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
				setWinner(tiles[a]);
			} else if (tiles.every(tile => tile !== null)) {
				setWinner("Draw");
			}
		}
	}, [tiles]);

	useEffect(() => {
		if (winner) {

			const key = winner === "Player X" ? "X" : winner === "Player O" ? "O" : "Draw"

			setScores(prev => ({
				...prev,
				[key]: prev[key] + 1,
			}));
		}
	}, [winner]);

	return (
		<>
			<div className="flex max-w-6xl w-full justify-evenly md:flex-row flex-col-reverse md:gap-0 gap-6 md:p-0 p-4">
				<Card className="aspect-square md:w-1/2 w-full bg-[#D2B48C] border-amber-950/10">
					<CardAction className="grid grid-cols-3 grid-rows-3 size-full p-8 gap-4">
						{tiles.map((tile, index) => (
							<Button key={index}
								variant="outline"
								className="size-full bg-amber-100 aspect-square hover:bg-amber-50 hover:cursor-pointer"
								onClick={() => {
									handleTileClick(index);
									setBtnDisabled(prev => {
										const btnStateArr = [...prev];
										btnStateArr[index] = !btnDisabled[index];
										return btnStateArr;
									});
								}}
								disabled={btnDisabled[index]}
							>
								{tile !== null && (
									tiles[index] === "Player X" ?
										<X className={`md:size-24 size-16 text-rose-500 ${winner === "Player X" && "animate-ping"}`} /> : <Circle className="md:size-24 size-16 text-blue-400" />
								)}
							</Button>
						))}
					</CardAction>
				</Card>
				<div className="flex flex-col justify-evenly md:gap-0 gap-6">
					<div className="flex flex-col gap-4">
						<CardTitle>
							<h1 className="text-4xl text-center font-baloo">Tic-Tac-Toe 🐶</h1>
						</CardTitle>
						<CardDescription className="flex-row flex gap-3 justify-center items-center">
							<p className="w-fit">
								Christian James Santos
							</p>
							<Link className="h-4 inline-flex items-center gap-1 text-blue-500 hover:border-b border-b-blue-500" href="https://shijisan-dev.vercel.app"><BriefcaseBusiness className="inline size-3" /> View Portfolio</Link>
						</CardDescription>
					</div>
					<Card className="bg-[#D2B48C] border-amber-950/10">
						<CardContent className="gap-2 flex flex-col">
							<h1 className="font-baloo text-lg font-semibold">{turn}'s' Turn</h1>
							<CardAction className="flex justify-evenly w-full gap-3">
								<Button
									variant="ghost"
									className="customBtn1"
									onClick={handleResetScore}
								>
									Reset Score
								</Button>
								<Button
									variant="ghost"
									className="customBtn2"
									onClick={handleSwitchTurn}
								>
									Switch Side
								</Button>
							</CardAction>
						</CardContent>
					</Card>
					<Card className="bg-[#D2B48C] border-amber-950/10 gap-2">
						<CardHeader>
							<h2 className="font-baloo text-lg font-semibold">Scoreboard</h2>
							<CardAction>
								<Button
									variant="ghost"
									onClick={handleResetScore}
									className="px-2! py-1! h-6! hover:cursor-pointer hover:bg-black/10 text-amber-100 hover:text-amber-100!"
								>
									Reset
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent className="flex gap-6 mx-4 justify-evenly">
							<div className="flex flex-col gap-1">
								<p className="text-rose-500">Player X</p>
								<p className="scoreBox">{scores.X}</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-blue-500">Player O</p>
								<p className="scoreBox">{scores.O}</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-amber-800 font-medium">Draw</p>
								<p className="scoreBox">{scores.Draw}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{winner &&
				<div className="bg-black/50 w-full min-h-screen fixed flex items-center justify-center">
					<Card className="max-w-sm bg-[#D2B48C] border-amber-950/10 gap-2!">
						<CardHeader>
							<CardTitle>
								<h2 className="text-xl text-amber-900">{winner !== "Draw" ? `${winner} Wins!` : `Draw!`} </h2>
							</CardTitle>
						</CardHeader>
						<CardContent className="gap-4 flex flex-col">
							<p>Track your scores via the Scoreboard!</p>
							<CardAction className="self-end">
								<Button
									variant="ghost"
									className="customBtn2"
									onClick={handlePlayAgain}
								>
									🐾&nbsp; Play Again
								</Button>
							</CardAction>
						</CardContent>
					</Card>
				</div>
			}

		</>
	)
}