export default async function handler(req, res) {
  if (req.method === 'POST') {
    // ⭐️ Vercel 금고(환경 변수)에서 주소와 키를 안전하게 꺼내옵니다.
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const userText = req.body.text;

    // Supabase DB의 'guestbook' 테이블로 데이터 전송
    const response = await fetch(`${supabaseUrl}/rest/v1/guestbook`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userText }) 
    });

    res.status(200).json({ result: "보안 완벽! DB 저장 성공!" });
  }
}
