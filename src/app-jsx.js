import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, Timer, Brain, Crown, Star, Users } from 'lucide-react';

const QuizGame = () => {
  // State
  const [isAdmin, setIsAdmin] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="border-b bg-white">
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            משחק חידות אינטראקטיבי מודולרי
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!gameStarted ? (
            <div className="space-y-6">
              {players.length === 0 && (
                <div className="flex items-center gap-2 p-4 bg-purple-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label>הירשם כמנהל משחק</Label>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="הכנס את שמך"
                  className="flex-1"
                />
                <Button onClick={() => {
                  if (playerName.trim()) {
                    setPlayers([...players, {
                      id: players.length + 1,
                      name: playerName,
                      score: 0,
                      isAdmin: players.length === 0 && isAdmin
                    }]);
                    setPlayerName('');
                  }
                }}>
                  הירשם למשחק
                </Button>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-purple-600" />
                  <h3 className="font-bold">שחקנים רשומים ({players.length}/20)</h3>
                </div>
                <div className="space-y-2">
                  {players.map((player, index) => (
                    <div key={player.id} 
                      className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {player.isAdmin && <Crown className="h-4 w-4 text-yellow-500" />}
                        <span>{player.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{player.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {players.some(p => p.isAdmin) && players[0].isAdmin && (
                <Button
                  className="w-full"
                  onClick={() => setGameStarted(true)}
                >
                  התחל משחק
                </Button>
              )}
            </div>
          ) : (
            <div>המשחק החל!</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;