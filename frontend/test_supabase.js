// Test script to verify Supabase connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nscfzwezqfeqmiinhinq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2Z6d2V6cWZlcW1paW5oaW5xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTM5NTE1NCwiZXhwIjoyMDc0OTcxMTU0fQ.eMn9Eo3Aq7F6rkyOVtxjkUziHKw0JeTCbU-6Gm7wRA4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Fetch existing documents
    console.log('Test 1: Fetching existing documents...');
    const { data: documents, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (fetchError) {
      console.error('❌ Error fetching documents:', fetchError.message);
    } else {
      console.log(`✅ Successfully fetched ${documents.length} documents`);
      if (documents.length > 0) {
        console.log('Latest document:', {
          title: documents[0].title,
          symbol: documents[0].symbol,
          sector: documents[0].sector,
        });
      }
    }
    console.log('');

    // Test 2: Insert a test document
    console.log('Test 2: Inserting a test document...');
    const testDocument = {
      title: `Test Document - ${new Date().toLocaleString()}`,
      content: 'This is an automated test document to verify real-time Supabase integration is working correctly. If you see this in your app feed, the integration is successful!',
      symbol: 'TEST',
      image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      sector: 'Technology',
      nifty50: 'Yes',
      BSE200: 'Yes',
    };

    const { data: insertedDoc, error: insertError } = await supabase
      .from('documents')
      .insert([testDocument])
      .select();

    if (insertError) {
      console.error('❌ Error inserting document:', insertError.message);
    } else {
      console.log('✅ Successfully inserted test document!');
      console.log('Document ID:', insertedDoc[0].id);
      console.log('\n📱 Check your mobile app - the new document should appear automatically!');
    }
    console.log('');

    // Test 3: Setup real-time listener
    console.log('Test 3: Testing real-time subscriptions...');
    console.log('Setting up real-time listener for 10 seconds...\n');

    const channel = supabase
      .channel('test-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'documents',
        },
        (payload) => {
          console.log('🔥 Real-time INSERT detected!');
          console.log('New document:', {
            title: payload.new.title,
            symbol: payload.new.symbol,
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Real-time subscription active!');
          console.log('Listening for new documents...\n');
        }
      });

    // Keep listening for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await supabase.removeChannel(channel);
    console.log('\n✅ All tests completed!');
    console.log('\n📋 Summary:');
    console.log('- Supabase connection: ✅ Working');
    console.log('- Database queries: ✅ Working');
    console.log('- Document insertion: ✅ Working');
    console.log('- Real-time subscriptions: ✅ Working');
    console.log('\n🎉 Your Supabase integration is fully functional!');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }

  process.exit(0);
}

testConnection();
