import React from "react";

const Dashboard = () => {
  const gameHistory = [
    {
      room_id: "ABC123",
      date: "2024-02-01",
      wins: 3,
      loses: 1,
      rewards: 500,
      folded: 2
    },
    {
      room_id: "DEF456",
      date: "2024-01-28",
      wins: 2,
      loses: 2,
      rewards: 400,
      folded: 1
    }
    // Add more game history data here
  ];

  return (
    <div className="bg-[#141414] w-full min-h-screen text-white">
      <div className="container max-lg:mx-auto px-4 py-8 " >
        <h1 className="text-3xl font-bold text-white mb-4">Gameplay History</h1>
        <table className="w-full table-auto border-collapse rounded-md">
          <thead>
            <tr>
              <th className="border border-gray-600 px-4 py-2">Room ID</th>
              <th className="border border-gray-600 px-4 py-2">Date</th>
              <th className="border border-gray-600 px-4 py-2">Wins</th>
              <th className="border border-gray-600 px-4 py-2">Loses</th>
              <th className="border border-gray-600 px-4 py-2">Rewards</th>
              <th className="border border-gray-600 px-4 py-2">Folded</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((game, index) => (
              <tr key={index}>
                <td className="border border-gray-600 px-4 py-2">
                  {game.room_id}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {game.date}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {game.wins}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {game.loses}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {game.rewards}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {game.folded}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
