export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 🚨 테스트용 직접 입력 (주의: 절대 실제 배포용 코드에 남겨두지 말 것!)
    const supabaseUrl = "https://ulkttpunyhwdrtneyegj.supabase.co";
    const supabaseKey = "sb_secret_U65Cs2S0P6GHL4cCdjQrEA_Rw2sZoXG";
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

    res.status(200).json({ result: "안전장치 해제! DB 저장 완벽하게 성공!" });
  }
}
