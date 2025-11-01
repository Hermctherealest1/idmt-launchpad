// Fully rewritten Next.js + Tailwind CSS IDMT Launchpad Preview
// Issue fixed: ensured proper semicolons and cleaned formatting for TS compatibility

// 1. tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "experimentalDecorators": true,
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

// 2. tailwind.config.js
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
};

// 3. pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// 4. pages/index.tsx
import { useState } from 'react';

interface Transaction {
  type: string;
  amount: string;
  received: number;
}

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [mockBalance, setMockBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const connectWallet = () => {
    setWalletConnected(true);
    alert('Mock wallet connected');
  };

  const buyWithAVAX = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      alert('Enter a valid amount');
      return;
    }
    const tokenAmount = value * 100;
    setMockBalance(prev => prev - value);
    setTransactions(prev => [...prev, { type: 'AVAX', amount: amount, received: tokenAmount }]);
    alert(`Purchased ${tokenAmount} IDMT using ${amount} AVAX`);
    setAmount('');
  };

  const buyWithCard = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      alert('Enter a valid amount');
      return;
    }
    const tokenAmount = value * 100;
    setTransactions(prev => [...prev, { type: 'CARD', amount: amount, received: tokenAmount }]);
    alert(`Purchased ${tokenAmount} IDMT using $${amount}`);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">iDemand Token (IDMT) Launch Pad Preview</h1>
      <button onClick={connectWallet} className="px-4 py-2 bg-blue-600 text-white rounded mb-4">
        {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      {walletConnected && <p className="mb-4">Mock AVAX Balance: {mockBalance}</p>}

      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="px-3 py-2 border rounded mr-2"
        />
        <button onClick={buyWithAVAX} className="px-4 py-2 bg-green-600 text-white rounded mr-2">Buy with AVAX</button>
        <button onClick={buyWithCard} className="px-4 py-2 bg-yellow-500 text-white rounded">Buy with Card</button>
      </div>

      <h2 className="text-2xl font-bold mb-2">Transaction History</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">IDMT Received</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{tx.type}</td>
              <td className="border px-4 py-2">{tx.amount}</td>
              <td className="border px-4 py-2">{tx.received}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 5. styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
